import { Sequelize } from "sequelize";

import {gate} from "../Models/ProductModel.js";

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