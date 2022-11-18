import {flight, gate} from "../Models/ProductModel.js";

export const getAllFlights = async (req, res) => {
    try {
        const flights = await flight.findAll(gate,{
            foreignKey: 'FLIGHT_CODE'
        });
        res.json(flights);
        console.log(flights)
    } catch (error) {
        res.json({ message: error.message });
    }  
}   

export const getFlightById = async (req, res) => {
    try {
        const flights = await flight.findAll({
            where: {
                FLIGHT_CODE: req.body.id
            }
        });
        res.json(flights[0]);
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
                    FLIGHT_CODE: req.params.FLIGHT_CODE,
                }
            }
        );
        res.json({
            "message": "Flight Details Updated",
            "req": req,
            "res": res
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deleteFlight = async (req, res) => {
    try {
        await flight.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Flight Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}