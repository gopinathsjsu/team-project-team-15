import { Sequelize } from "sequelize";
import * as passengercontroller from './Passengers.js'
import * as airlineEmployeecontroller from './AirlineEmployee.js';
import * as airportEmployeecontroller from './AirportEmployee.js'

export const get = async (req, res) => {
    if(req.body.accountType=='PASSENGERS'){
        passengercontroller.getPassenger(req,res);
    }
    else if(req.body.accountType=='AIRLINE_EMPLOYEE'){
        airlineEmployeecontroller.getAirline(req,res)
    }
    else{
        if(req.body.accountType=='AIRPORT_EMPLOYEE'){
        airportEmployeecontroller.getAirport(req,res)}
    }
}

