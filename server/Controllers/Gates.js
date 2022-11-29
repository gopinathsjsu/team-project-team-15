import gate from "../Models/gatesModel.js";
import { Sequelize } from "sequelize";

export const getAllGates = async (req, res) => {
    try {
        const gates = await gate.findAll({
            attributes: ["ID", "TERMINAL_NUMBER", "GATE_NUMBER", "FLIGHT_CODE"],
        });
        res.json(gates);
        console.log(JSON.stringify(gates, null, 1))
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const randomGate = async (req, res) => {
    try {
        const randGate = await gate.findOne({
            attributes: ["ID", "TERMINAL_NUMBER", "GATE_NUMBER"],
            where: {
                isEnabled: 1,
                FLIGHT_CODE: null
            },
            order: Sequelize.literal('rand()')
        });
        res.json(randGate);
        console.log(JSON.stringify(randGate, null, 2))
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const assignGate = async (req, res) => {
    try {
            await gate.update(req.body, 
            {
                where: {
                    TERMINAL_NUMBER: req.params.terminal,
                    GATE_NUMBER: req.params.gate,
                }
            }
        );
        res.json({
            "message": "Gate Assigned",
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const unassignGate = async (req, res) => {
    try {
            await gate.update({
                FLIGHT_CODE: null
            }, 
            {
                where: {
                    TERMINAL_NUMBER: req.params.terminal,
                    GATE_NUMBER: req.params.gate,
                }
            }
        );
        res.json({
            "message": "Gate Unassigned",
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const enableGate = async (req, res) => {
    try {
            await gate.update({
                isEnabled: 1
            }, 
            {
                where: {
                    TERMINAL_NUMBER: req.params.terminal,
                    GATE_NUMBER: req.params.gate,
                }
            }
        );
        res.json({
            "message": "Enabled Gate",
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const disableGate = async (req, res) => {
    try {
            await gate.update({
                isEnabled: 0
            }, 
            {
                where: {
                    TERMINAL_NUMBER: req.params.terminal,
                    GATE_NUMBER: req.params.gate,
                }
            }
        );
        res.json({
            "message": "Disabled Gate",
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}