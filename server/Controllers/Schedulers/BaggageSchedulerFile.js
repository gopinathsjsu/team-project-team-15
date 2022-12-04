import fs from "fs"
import moment from "moment";
import axios from "axios";
import {StartBaggagesCron} from "./BaggagesCronJob.js";
import { response } from "express";

export function maintainbagtemp(){

  const getflights = async() => {
    let flights = await axios.get(`http://localhost:5001/api/v1/flights`);
    flights = flights.data.filter(response => response.BAGGAGE === null)
    flights = flights.map(function(flights){ 
      if (flights['ARRIVAL_DATE']){
        return [flights["FLIGHT_CODE"], flights['ARRIVAL_DATE']]
      }
    });
    flights = flights.filter(response => response !== undefined)

    flights = flights.filter(response =>  moment.utc(response[1]).add(8, 'hours').diff(moment(),'seconds') > 0);
    flights.sort(function(first, second) {
      return moment(first[1]) - moment(second[1]);
    });

    flights = flights.reduce((key,val)=>(key[val[0]] = val[1], key), {});
    console.log(flights);
    fs.writeFileSync("./Controllers/Schedulers/baggages.json",JSON.stringify(flights, null, 4), (err) => console.log(err));
  }
  getflights();
}

export function baggagecronfunction(){
  
  const initcheck = async(flights, upcomflight, upcomtime) => {
    const gatecheck = await axios.get(`http://localhost:5001/api/v1/gates/${upcomflight}`)
    const baggagecheck = await axios.get(`http://localhost:5001/api/v1/baggages/${upcomflight}`)
    if (gatecheck.data !== null || baggagecheck.data === null){
      let timediff = moment(upcomtime).diff(moment(),'minutes');
      if (timediff<60){
        console.log("Initiliazed baggage assignment for flight ", upcomflight);
        StartBaggagesCron(flights, upcomflight, gatecheck.data.TERMINAL_NUMBER)
      }else{
        console.log("Upcoming flight",upcomflight,",baggage to be assigned in ",timediff-2,"minutes");
      }
    }else{
      delete flights[upcomflight];
      //console.log(JSON.stringify(flights), null, 4);
      fs.writeFileSync("./Controllers/Schedulers/baggages.json",JSON.stringify(flights, null, 4), (err) => console.log(err));
    }
  }

  fs.readFile("./Controllers/Schedulers/baggages.json", (err, data) => { 
    if (err) throw err;
    
    let flights = JSON.parse(data);
    let [upcomflight,upcomtime] = Object.entries(flights)[0];
    initcheck(flights, upcomflight, upcomtime);
  });
}