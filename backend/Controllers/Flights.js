import { Sequelize } from "sequelize";

import {gate} from "../Models/ProductModel.js";

export const getGroupGates = async (req, res) => {
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

export const EnableGate = async (req, res) => {
    try {
        const upd = await gate.update({
                IsEnabled: 0,
            }, 
            {
                where: {
                    TERMINAL_NUMBER: 1,
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

