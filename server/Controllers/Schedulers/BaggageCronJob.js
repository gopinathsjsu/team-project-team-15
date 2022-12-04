import axios from "axios";
import fs from "fs";


export function StartBaggageCron(flights, upcomflight){  

    const AssignBaggage = async(upcomflight) => {
      try {
        const response1 = await axios.get(`http://localhost:5001/api/v1/gates/${upcomflight}`);
        const response = await axios.get(`http://localhost:5001/api/v1/baggages/rbaggage/${response1.data.TERMINAL_NUMBER}`);
        const assignapicall = `http://localhost:5001/api/v1/baggages/assignbaggage/${response.data.TERMINAL_NUMBER}/${response.data.GATE_NUMBER}`
        const assignbody = {"FLIGHT_CODE": `${upcomflight}`};
        
        await axios.post(`${assignapicall}`,assignbody);
        console.log("Assigned ",upcomflight,"to ",response.data)
      } catch (error) {
        console.log(error.message);
      }
    }
  
    const unAssignBaggage = async(upcomflight) => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/baggages/${upcomflight}`);
        console.log(response);
        const assignapicall = `http://localhost:5001/api/v1/gates/baggages/${response.data.TERMINAL_NUMBER}/${response.data.GATE_NUMBER}`;
        const unassignbody = {"FLIGHT_CODE": null};
        
        await axios.post(`${assignapicall}`,unassignbody);
        console.log("UnAssigned ",upcomflight,"From ",response.data)
      } catch (error) {
        console.log(error.message);
      }
    }

    const RemoveFlightFromCron = async(flights, upcomflight) => {
        delete flights[upcomflight];
        console.log(flights)
        fs.writeFileSync("./Controllers/Schedulers/baggages.json",JSON.stringify(flights, null, 4), (err) => console.log(err));
    }

    AssignBaggage(upcomflight);
    RemoveFlightFromCron(flights, upcomflight)
    setTimeout(() => {
      unAssignBaggage(upcomflight);
    }, (2 * 60 * 60 * 1000));   
}
