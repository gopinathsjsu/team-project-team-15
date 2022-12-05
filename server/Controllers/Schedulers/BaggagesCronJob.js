import axios from "axios";
import fs from "fs";
//import { baggagecronfunction } from "./BaggageSchedulerFile.js";


export function StartBaggagesCron(flights, upcomflight, flightterminal){  

    const AssignBaggage = async(upcomflight, flightterminal) => {
      try {
        const response = await axios.get(`/api/v1/baggages/rbaggage/${flightterminal}`);
        const assignapicall = `/api/v1/baggages/assignbaggage/${flightterminal}/${response.data.BAGGAGE_NUMBER}`
        const assignbody = {"FLIGHT_CODE": `${upcomflight}`};
        
        await axios.post(`${assignapicall}`,assignbody);
        console.log("Assigned ",upcomflight,"to ",response.data)
      } catch (error) {
        console.log(error.message);
      }
    }
  
    const unAssignBaggage = async(upcomflight, flightterminal) => {
      try {
        const response = await axios.get(`/api/v1/baggags/${upcomflight}`);
        const assignapicall = `/api/v1/baggages/unassignbaggage/${response.data.TERMINAL_NUMBER}/${response.data.BAGGAGE_NUMBER}`;
        const unassignbody = {"FLIGHT_CODE": null};
        
        await axios.post(`${assignapicall}`,unassignbody);
        console.log("UnAssigned ",upcomflight,"from ",response.data)
      } catch (error) {
        console.log(error.message);
      }
    }

    const RemoveFlightFromCron = async(flights, upcomflight) => {
        delete flights[upcomflight];
        fs.writeFileSync("./Controllers/Schedulers/baggages.json",JSON.stringify(flights, null, 4), (err) => console.log(err));
    }

    AssignBaggage(upcomflight, flightterminal);
    RemoveFlightFromCron(flights, upcomflight)
    setTimeout(() => {
      unAssignBaggage(upcomflight, flightterminal);
    }, (2 * 60 * 60 * 1000));   
}
