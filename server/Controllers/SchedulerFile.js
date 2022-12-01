import fs from "fs"
import moment from "moment";
import axios from "axios";

export function maintaintemp(){
  const getflights = async() => {
    let flights = await axios.get(`http://localhost:5001/api/v1/flights`);

    var dflights = flights.data.map(function(flights){ 
      if (flights['DEPARTURE_DATE']){
        return [flights["FLIGHT_CODE"],flights['DEPARTURE_DATE']]
      }else{
        return [flights["FLIGHT_CODE"], flights['ARRIVAL_DATE']]
      }
    });
    dflights.sort(function(a, b) {
      return moment(a[1]) - moment(b[1]);
    });
    console.log(JSON.stringify(dflights, null, 2));

    flights = dflights.reduce((p,c)=>(p[c[0]] = c[1], p), {});
    console.log(flights);
    fs.writeFileSync("./Controllers/flights.json",JSON.stringify(flights), (err) => console.log(err));
  }
  getflights();
  cronfunction();
}

export function CronAddFlight(flight, date){
  fs.readFile("./Controllers/flights.json", (err, data) => {
      if (err) throw err;
      let flights = JSON.parse(data);

      function insertFlight(key,value,obj,pos){
          return Object.keys(obj).reduce((ac,a,i) => {
            if(i === pos) ac[key] = value;
            ac[a] = obj[a]; 
            return ac;
          },{})
        }

      var i = 0;
      for (const [key, value] of Object.entries(flights)) {
          if (value > date){
              flights = insertFlight(flight,date,flights,i);
              break;
          }
          i += 1;
      }
      fs.writeFileSync("./Controllers/flights.json",JSON.stringify(flights), (err) => console.log(err));
  });
}

export function CronUpdateFlight(flight, date){

  fs.readFile("./Controllers/flights.json", (err, data) => {
      if (err) throw err;
      let flights = JSON.parse(data);
      let [upcomflight,upcomtime] = Object.entries(flights)[0];
      
      delete flights[upcomflight];
      console.log(flights)
      fs.writeFileSync("./Controllers/flights.json",JSON.stringify(flights), (err) => console.log(err));
    
      //RemoveFlightFromCron(flights, upcomflight);
      function insertFlight(key,value,obj,pos){
          return Object.keys(obj).reduce((ac,a,i) => {
            if(i === pos) ac[key] = value;
            ac[a] = obj[a]; 
            return ac;
          },{})
        }

      var i = 0;
      for (const [key, value] of Object.entries(flights)) {
          if (value > date){
              flights = insertFlight(flight,date,flights,i);
              break;
          }
          i += 1;
      }
      fs.writeFileSync("./Controllers/flights.json",JSON.stringify(flights), (err) => console.log(err));
  });
}

export function cronfunction(){
  const AssignGate = async(upcomflight) => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/rgate`);
        console.log(response.data);
        const assignapicall = `http://localhost:5001/api/v1/assigngate/${response.data.TERMINAL_NUMBER}/${response.data.GATE_NUMBER}`
        const assignbody = {"FLIGHT_CODE": `${upcomflight}`};
        
        await axios.post(`${assignapicall}`,assignbody).then((response) => {
            console.log(assignapicall, response.data)
          });
      } catch (error) {
        console.log(error.message);
      }
    }

    const unAssignGate = async(upcomflight) => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/gates/${upcomflight}`);
        const assignapicall = `http://localhost:5001/api/v1/unassigngate/${response.data.TERMINAL_NUMBER}/${response.data.GATE_NUMBER}`;
        const unassignbody = {"FLIGHT_CODE": null};
        
        await axios.post(`${assignapicall}`,unassignbody).then((response) => {
            console.log(assignapicall, response.data)
          });
      } catch (error) {
        console.log(error.message);
      }
    }

    const RemoveFlightFromCron = async(flights, upcomflight) => {
      delete flights[upcomflight];
      console.log(flights)
      fs.writeFileSync("./Controllers/flights.json",JSON.stringify(flights), (err) => console.log(err));
    }

    fs.readFile("./Controllers/flights.json", (err, data) => {
      if (err) throw err;
      
      let flights = JSON.parse(data);
      let [upcomflight,upcomtime] = Object.entries(flights)[0];
  
      var timediff = moment.utc(upcomtime).add(8, 'hours').diff(moment(),'minutes');
      console.log(timediff);
      if (timediff<=60){
        AssignGate(upcomflight);
        RemoveFlightFromCron(flights, upcomflight);
        setTimeout(() => {
          unAssignGate(upcomflight);
        }, (60 * 1000));   
      }
  });
}