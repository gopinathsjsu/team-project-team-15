import { Sequelize } from "sequelize";
import {flight, gate} from "../Models/ProductModel.js";

export const getAllFlights = async (req, res) => {
    try {
        const flights = await flight.findAll({
            include: [{
                attributes: ["FLIGHT_CODE", "AIRLINE_CODE", "DEPARTURE_PLACE", "ARRIVAL_PLACE", "DEPARTURE_DATE", "ARRIVAL_DATE", "FLIGHT_BAGGAGE"],
                model: gate,
                on: {
                    FLIGHT_CODE: Sequelize.where(Sequelize.col("FLIGHTS.FLIGHT_CODE"), "=", Sequelize.col("GATE.FLIGHT_CODE"))
                },
                attributes: ["TERMINAL_NUMBER", "GATE_NUMBER"]
            }] 
        });
        //console.log(JSON.stringify(flights, null, 2))
        res.json(flights);
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
            }
        );
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
