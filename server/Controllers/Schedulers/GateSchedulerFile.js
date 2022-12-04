import fs from "fs"
import moment from "moment";
import axios from "axios";
import {StartGatesCron} from "./GatesCronJob.js";
//import { maintainbagtemp } from "./BaggageSchedulerFile.js";

export function maintaintemp(){

  const getflights = async() => {
    let flights = await axios.get(`http://localhost:5001/api/v1/flights`);
    flights = flights.data.filter(response => response.GATE === null)
    flights = flights.map(function(flights){ 
      if (flights['DEPARTURE_DATE']){
        return [flights["FLIGHT_CODE"],flights['DEPARTURE_DATE']]
      }else{
        return [flights["FLIGHT_CODE"], flights['ARRIVAL_DATE']]
      }
    });

    flights = flights.filter(response =>  moment.utc(response[1]).add(8, 'hours').diff(moment(),'seconds') > 0);
    flights.sort(function(first, second) {
      return moment(first[1]) - moment(second[1]);
    });

    flights = flights.reduce((key,val)=>(key[val[0]] = val[1], key), {});
    console.log(flights);
    fs.writeFileSync("./Controllers/Schedulers/gates.json",JSON.stringify(flights, null, 4), (err) => console.log(err));
  }
  getflights();
//  maintainbagtemp();
}

export function gatecronfunction(){
  const initcheck = async(flights, upcomflight, upcomtime) => {
    const gatecheck = await axios.get(`http://localhost:5001/api/v1/gates/${upcomflight}`)
//    console.log(gatecheck.data);
    if (gatecheck.data === null){
      let timediff = moment(upcomtime).diff(moment(),'minutes');
      if (timediff<60){
        console.log("Initiliazed gate assignment for flight ", upcomflight);
        StartGatesCron(flights, upcomflight)
      }else{
        console.log("Upcoming flight ",upcomflight,",Gate to be in ",timediff-60,"minutes");
      }
    }else{
      delete flights[upcomflight];
      console.log(JSON.stringify(flights), null, 4);
      fs.writeFileSync("./Controllers/Schedulers/gates.json",JSON.stringify(flights, null, 4), (err) => console.log(err));
    }
  }

  fs.readFile("./Controllers/Schedulers/gates.json", (err, data) => { 
    if (err) throw err;
    
    let flights = JSON.parse(data);
    let [upcomflight,upcomtime] = Object.entries(flights)[0];
    initcheck(flights, upcomflight, upcomtime);
  });
}