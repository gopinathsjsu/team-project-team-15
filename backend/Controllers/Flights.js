import { Sequelize } from "sequelize";

import {flight, gate} from "../Models/ProductModel.js";


export const getAllEnabledGates = async (req, res) => {
    try {
        const gates = await gate.findAll({
            where: {
                Isenabled: "1"
            } 
        });
        res.json(gates);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getAllDisabledGates = async (req, res) => {
    try {
        const gates = await gate.findAll({
            where: {
                Isenabled: "0"
            } 
        });
        res.json(gates);
    } catch (error) {
        res.json({ message: error.message });
    }  
}