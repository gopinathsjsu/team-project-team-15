import db from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const flight = db.define('FLIGHTS',{
    FLIGHT_CODE:{
        type: DataTypes.STRING
    },
    AIRLINE_CODE:{
        type: DataTypes.STRING
    },
    DEPARTURE_PLACE:{
        type: DataTypes.STRING
    },
    ARRIVAL_PLACE:{
        type: DataTypes.STRING
    },
    DEPARTURE_DATE:{
        type: DataTypes.DATE
    },
    ARRIVAL_DATE:{
        type: DataTypes.DATE
    },
    FLIGHT_BAGGAGE:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

const gate = db.define('GATES',{
    ID:{
        type: DataTypes.INTEGER
    },
    TERMINAL_NUMBER:{
        type: DataTypes.INTEGER
    },
    GATE_NUMBER:{
        type: DataTypes.STRING
    },
    FLIGHT_CODE:{
        type: DataTypes.STRING
    },
    IsEnabled: {
        type: DataTypes.INTEGER
    },
    CreatedAt: {
        type: DataTypes.DATE
    },
    UpdatedAt: {
        type: DataTypes.DATE
    }
},{
    freezeTableName: true
});

flight.hasOne(gate);

export {flight, gate};