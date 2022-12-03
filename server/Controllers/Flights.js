import { Sequelize } from "sequelize";
import {flight, gate} from "../Models/flightsModel.js";
import { CronAddFlight, CronUpdateFlight } from "./SchedulerFile.js";


export const getAllFlights = async (req, res) => {
    try {
        const flights = await flight.findAll({
            attributes: ["FLIGHT_CODE", "AIRLINE_CODE", "DEPARTURE_PLACE", "ARRIVAL_PLACE", "DEPARTURE_DATE", "ARRIVAL_DATE", "FLIGHT_BAGGAGE"],
            include: [{
                model: gate,
                required: false,
                on: {
                    FLIGHT_CODE: Sequelize.where(Sequelize.col("FLIGHTS.FLIGHT_CODE"), "=", Sequelize.col("GATE.FLIGHT_CODE"))
                },
                attributes: ["TERMINAL_NUMBER", "GATE_NUMBER"],
            }], 
            order: [
                ["DEPARTURE_DATE",'ASC'],
                ["ARRIVAL_DATE", 'ASC']
            ],
        });
        res.json(flights);
        console.log(JSON.stringify(flights, null, 2))
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getFlightById = async (req, res) => {
    try {
        const flights = await flight.findOne({
            where: {
                FLIGHT_CODE: req.params.id
            } 
        });
        console.log(JSON.stringify(flights, null, 2))
        res.json(flights);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const AddFlight = async (req, res) => {
    try {
        await flight.create(req.body);
        console.log(req.body);
        res.json({
            "message": "Added new Flight"
        });
        console.log(req.body);
        CronAddFlight(req.body.FLIGHT_CODE, req.body.DEPARTURE_DATE.toISOString());
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateFlight = async (req, res) => {
    try {
        await flight.update(req.body, 
        {
            where: {
                FLIGHT_CODE: req.params.id,
            }
        });
        CronUpdateFlight(flights.FLIGHT_CODE, flights.DEPARTURE_DATE.toISOString());
        res.json({
            "message": "Flight Details Updated",
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deleteFlight = async (req, res) => {
    try {
        await flight.destroy({
            where: {
                FLIGHT_CODE: req.params.id
            }
        });
        res.json({
            "message": "Flight Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}


export const getDisabledGates = async (req, res) => {
    try {
        const allgates = await gate.findAll({
            attributes: ["ID","TERMINAL_NUMBER","GATE_NUMBER"],
            group: ["TERMINAL_NUMBER","GATE_NUMBER"],
            where: {
                Isenabled: "0"
            } 
        });
        res.json(allgates);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const EnableGate = async (req, res) => {
    try {
        const upd = await gate.update({
                IsEnabled: 1
            }, 
            {
                where: {
                    TERMINAL_NUMBER: req.params.terminal,
                    GATE_NUMBER: req.params.gate,
                }
            },
            
            
        );
        console.log('updated',req.params)
        res.json(upd);
        /*res.json({
            "message": "Enabled Gate",
        });*/
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }  
}

export const getEnabledGates = async (req, res) => {
    try {
        const gates = await gate.findAll({
            attributes: ["ID","TERMINAL_NUMBER","GATE_NUMBER"],
            group: ["TERMINAL_NUMBER","GATE_NUMBER"],
            where: {
                Isenabled: "1"
            } 
        });
        res.json(gates);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const DisableGate = async (req, res) => {
    try {
        const disable = await gate.update({
                IsEnabled: 0,
            }, 
            {
                where: {
                    TERMINAL_NUMBER: req.params.terminal,
                    GATE_NUMBER: req.params.gate,
                }
            },
            
            
        );
        console.log('Disabled Gate',req.params)
        res.json(disable);
        /*res.json({
            "message": "Enabled Gate",
        });*/
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }  
}
