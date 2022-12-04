import axios from "axios";
import fs from "fs";
import { baggagecronfunction } from "./BaggageSchedulerFile.js";


export function StartGatesCron(flights, upcomflight){  

    const AssignGate = async(upcomflight) => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/gates/rgate`);
        const assignapicall = `http://localhost:5001/api/v1/gates/assigngate/${response.data.TERMINAL_NUMBER}/${response.data.GATE_NUMBER}`
        const assignbody = {"FLIGHT_CODE": `${upcomflight}`};
        
        await axios.post(`${assignapicall}`,assignbody);
        console.log("Assigned ",upcomflight,"to ",response.data)
      } catch (error) {
        console.log(error.message);
      }
    }
  
    const unAssignGate = async(upcomflight) => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/gates/${upcomflight}`);
        const assignapicall = `http://localhost:5001/api/v1/gates/unassigngate/${response.data.TERMINAL_NUMBER}/${response.data.GATE_NUMBER}`;
        const unassignbody = {"FLIGHT_CODE": null};
        
        await axios.post(`${assignapicall}`,unassignbody);
        console.log("UnAssigned ",upcomflight,"from ",response.data)
      } catch (error) {
        console.log(error.message);
      }
    }

    const RemoveFlightFromCron = async(flights, upcomflight) => {
        delete flights[upcomflight];
        console.log(flights)
        fs.writeFileSync("./Controllers/Schedulers/gates.json",JSON.stringify(flights, null, 4), (err) => console.log(err));
    }

    AssignGate(upcomflight);
    baggagecronfunction();
    RemoveFlightFromCron(flights, upcomflight)
    setTimeout(() => {
      unAssignGate(upcomflight);
      unAssignBaggage(upcomflight);
    }, (2 * 60 * 60 * 1000));   
}
