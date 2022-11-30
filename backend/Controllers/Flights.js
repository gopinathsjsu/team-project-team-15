import { Sequelize } from "sequelize";

import {flight, gate} from "../Models/ProductModel.js";

export const getTerminals = async (req, res) => {
    try {
        const gates = await gate.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('TERMINAL_NUMBER')), 'TERMINAL_NUMBER'],
            ],
            where: {
                Isenabled: "1"
            } 
        });
        res.json(gates);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getGroupGates = async (req, res) => {
    try {
        const gates = await gate.findAll({
            attributes: ["TERMINAL_NUMBER","GATE_NUMBER"],
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

/*Job.findAll({
    attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('title')), 'title'],
        'location'
    ]
})

Job.findAll({attributes: ['title', 'location'], group: ['title', 'location']})*/
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