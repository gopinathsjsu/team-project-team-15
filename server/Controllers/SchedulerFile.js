import fs from "fs"
import moment from "moment";
import axios from "axios";
import {StartCronGates} from "./GatesCronJob.js";

export function maintaintemp(){
  const getflights = async() => {
    let flights = await axios.get(`http://localhost:5001/api/v1/flights`);

    flights = flights.data.map(function(flights){ 
      if (flights['DEPARTURE_DATE']){
        return [flights["FLIGHT_CODE"],flights['DEPARTURE_DATE'], moment()]
      }else{
        return [flights["FLIGHT_CODE"], flights['ARRIVAL_DATE'], moment()]
      }
    });

    flights = flights.filter(response =>  moment(response[1]).add(8, 'hours').diff(moment(),'seconds') > 0);
    flights.sort(function(first, second) {
      return moment(first[1]) - moment(second[1]);
    });

    flights = flights.reduce((key,val)=>(key[val[0]] = val[1], key), {});
    console.log(flights);
    fs.writeFileSync("./Controllers/flights.json",JSON.stringify(flights, null, 4), (err) => console.log(err));
  }
  getflights();
  cronfunction();
}


export function cronfunction(){
    fs.readFile("./Controllers/flights.json", (err, data) => {
      if (err) throw err;
      
      let flights = JSON.parse(data);
      let [upcomflight,upcomtime] = Object.entries(flights)[0];
      console.log(upcomflight, upcomtime);
      var timediff = moment.utc(upcomtime).add(8, 'hours').diff(moment(),'minutes');
      console.log(timediff);
      if (timediff<=60){
        StartCronGates(upcomflight, flights)
      }
  });
}