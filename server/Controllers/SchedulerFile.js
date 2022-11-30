import fs from "fs"
import moment from "moment";
import axios from "axios";

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
        //console.log(flights);
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


















{/* 
        var items = Object.keys(flights).map(function(key) {
            const flighttime = moment(flights[key]).format('YYYY-MM-DD hh-mm-ss')
            const starttime = moment(flights[key]).add(-1, 'hours')
            const endtime = moment(flights[key]).add(1, 'hours')
            return [key, flighttime]
            //return [key, starttime.format('YYYY-MM-DD hh-mm-ss'), flighttime, endtime.format('YYYY-MM-DD hh-mm-ss')];
        });

//        console.log(items);
//        console.log(items);
//        console.log(moment.utc(items[0][1]).format());
//        console.log(stp);

        moment(response.DEPARTURE_DATE).diff(moment(),'hours')

        var date = new Date(2022, 11, 29, 5, 30, 0);
        
        var j = schedule.scheduleJob(date, function(){
          console.log('The world is going to end today.');
        });
        
        cron.schedule("* * * * * *", () => {
            var timediff = moment(date).diff(moment(), 'seconds');
            console.log(timediff);
        });

        let rule = new schedule.RecurrenceRule();
        rule.tz = 'America/Tijuana';
        rule.hour = 1;
        rule.minute = 14;
        rule.second = 0;

        schedule.scheduleJob(rule, function () {
            console.log('Hello World!');
          });

    console.log(upcomflight, new moment(upcomtime).format('YYYY-MM-DD hh-mm-ss').utc());
    const flighttime = moment(upcomtime).format('YYYY-MM-DD hh-mm-ss').utc()
    const starttime = moment.utc(upcomtime).add(-1, 'hours').format('YYYY-MM-DD hh-mm-ss')
    const endtime = moment.utc(upcomtime).add(1, 'hours').format('YYYY-MM-DD hh-mm-ss')
    
    var timediff = moment.utc(upcomtime).diff(moment(), 'hours');
    console.log(timediff);
    var date = new Date(2022, 11, 29, 15, 8, 0);
        
    var j = schedule.scheduleJob(date, function(){
      console.log('The world is going to end today.');
    });

    console.log(upcomtime);
    console.log(moment(upcomtime).format('YYYY-MM-DD hh-mm-ss'));
    console.log(new moment(upcomtime).format('YYYY-MM-DD hh-mm-ss'));
    console.log(moment.utc(upcomtime).format('YYYY-MM-DD hh-mm-ss'));
    console.log(new moment.utc(upcomtime).format('YYYY-MM-DD hh-mm-ss'));
    console.log(moment.utc(moment(upcomtime)).format('YYYY-MM-DD hh-mm-ss'));
    console.log(upcomtime);
    console.log(moment());
    console.log(moment.utc());
    console.log(moment().format('YYYY-MM-DD hh-mm-ss'));
    console.log(moment.utc().format('YYYY-MM-DD hh-mm-ss'));
    console.log(moment.utc(upcomtime).format('YYYY-MM-DD hh-mm-ss'));
    console.log(moment.utc(upcomtime).diff(moment.utc(),'hours'));



    console.log(upcomtime);
    console.log(moment(moment()));
    console.log(new Date(upcomtime));
    console.log(new Date());
    let now = moment().format('YYYY-MM-DD hh-mm-ss')
    let ft = moment.utc(upcomtime).format('YYYY-MM-DD hh-mm-ss')
    console.log(moment(now));
    console.log(ft);
    //console.log(moment(now).diff(,'hours'));



          
        const upresponse = axios.patch('http://localhost:5001/api/v1/assigngate/${rgate.TERMINAL_NUMBER}/${gate}',{
            FLIGHT_CODE: upcomflight
        }); 
        console.log(JSON.stringify(upresponse, null, 2));
      

             const response = await axios.post(`${apiURL}/products`, await getSpecials());


        const getRGATE = async(req, res) => {
            await axios.get('http://localhost:5001/api/v1/rgate').then(res =>{
              console.log("output"+res.data);
              //res.json(rgate.data);  
            });
            //rgate.then(function(result) {
            //console.log(result.data.GATE_NUMNER, result.data.TERMINAL_NUMBER) // "Some User token"
          };
          const abc = getRGATE();
          console.log("abc"+abc);
          //const gate = abc.data.GATE_NUMBER;

          const apicall = 'http://localhost:5001/api/v1/assigngate/${rgate.data.TERMINAL_NUMBER}/${rgate.data,.GATE_NUMBER}'
          console.log(apicall);
        */}
