import { Sequelize } from "sequelize";
import baggage from "../Models/baggageModel.js";

export const getAllBaggages = async (req, res) => {
    try {
        const baggages = await baggage.findAll({
            attributes: ["ID", "TERMINAL_NUMBER", "BAGGAGE_NUMBER", "FLIGHT_CODE"],
        });
        res.json(baggages);
        console.log(JSON.stringify(baggages, null, 1))
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const randomBaggage = async (req, res) => {
    try {
        const randBag = await baggage.findOne({
            attributes: ["ID", "TERMINAL_NUMBER", "BAGGAGE_NUMBER"],
            where: {
                TERMINAL_NUMBER: req.params.terminal,
                FLIGHT_CODE: null
            },
            order: Sequelize.literal('rand()')
        });
        res.json(randBag);
        console.log(JSON.stringify(randBag, null, 2))
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getBaggagebyID = async (req, res) => {
    try {
        const baggagedetails = await baggage.findOne({
            attributes: ["ID", "TERMINAL_NUMBER", "BAGGAGE_NUMBER"],
            where: {
                FLIGHT_CODE: req.params.id
            },
        });
        res.json(baggagedetails);
        console.log(JSON.stringify(baggagedetails, null, 2))
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const assignBaggage = async (req, res) => {
    try {
            await baggage.update(req.body, 
            {
                where: {
                    BAGGAGE_NUMBER: req.params.baggage,
                    TERMINAL_NUMBER: req.params.terminal
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

export const dismissBaggage = async (req, res) => {
    try {
            await baggage.update({
                FLIGHT_CODE: null
            }, 
            {
                where: {
                    BAGGAGE_NUMBER: req.params.baggage,
                    TERMINAL_NUMBER: req.params.terminal
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