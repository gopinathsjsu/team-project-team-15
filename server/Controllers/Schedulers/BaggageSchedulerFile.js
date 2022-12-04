import fs from "fs"
import moment from "moment";
import axios from "axios";
import { StartBaggageCron } from "./BaggageCronJob.js";


export function maintainbagtemp(){

  const getflights = async() => {
    let flights = await axios.get(`http://localhost:5001/api/v1/flights`);
    flights = flights.data.filter(response => response.GATE === null && response.ARRIVAL_DATE !== null)
    flights = flights.map(function(flights){ 
      if (flights['ARRIVAL_DATE']){
        return [flights["FLIGHT_CODE"], flights['ARRIVAL_DATE']]
      }
    });
    
    console.log(flights);
    
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

  fs.readFile("./Controllers/Schedulers/baggages.json", (err, data) => { 
    if (err) throw err;
    
    let flights = JSON.parse(data);
    let [upcomflight,upcomtime] = Object.entries(flights)[0];
    console.log("Initiliazing baggage assignment for flight ", upcomflight);
    StartBaggageCron(flights, upcomflight)
    });
}