import gate from "../Models/gatesModel.js";
import { Sequelize } from "sequelize";
import { maintaingatetemp } from "./Schedulers/GateSchedulerFile.js"
import { maintainbagtemp }  from "./Schedulers/BaggageSchedulerFile.js"

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

export const getGatebyID = async (req, res) => {
    try {
        const gatedetails = await gate.findOne({
            attributes: ["ID", "TERMINAL_NUMBER", "GATE_NUMBER"],
            where: {
                FLIGHT_CODE: req.params.id
            },
        });
        res.json(gatedetails);
        console.log(JSON.stringify(gatedetails, null, 2))
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getEnabledGates = async (req, res) => {
    try {
        const gates = await gate.findAll({
            attributes: ["ID", "TERMINAL_NUMBER", "GATE_NUMBER", "FLIGHT_CODE"],
            where:{
                isEnabled: 1
            }
        });
        res.json(gates);
        console.log(JSON.stringify(gates, null, 1))
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getDisabledGates = async (req, res) => {
    try {
        const gates = await gate.findAll({
            attributes: ["ID", "TERMINAL_NUMBER", "GATE_NUMBER", "FLIGHT_CODE"],
            where:{
                isEnabled: 0
            }
        });
        res.json(gates);
        console.log(JSON.stringify(gates, null, 1))
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
        maintaingatetemp()
        maintainbagtemp()
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
        maintaingatetemp()
        maintainbagtemp()
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
                IsEnabled: 1
            }, 
            {
                where: {
                    TERMINAL_NUMBER: req.params.terminal,
                    GATE_NUMBER: req.params.gate,
                }
            },
        );
        console.log('Enabled Gate',req.params)
        res.json(enabresp);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }  
}

export const disableGate = async (req, res) => {
    try {
        const disabresp = await gate.update({
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
        res.json(disabresp);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }  
}