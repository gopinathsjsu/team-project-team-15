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
    FLIGHT_CODE:{
        type: DataTypes.STRING
    },
    TERMINAL_NUMBER:{
        type: DataTypes.INTEGER
    },
    GATE_NUMBER:{
        type: DataTypes.INTEGER
    },
    IsEnabled:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

const baggage = db.define('BAGGAGES',{
    FLIGHT_CODE:{
        type: DataTypes.STRING
    },
    TERMINAL_NUMBER:{
        type: DataTypes.INTEGER
    },
    BAGGAGE_NUMBER:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

flight.hasOne(gate);
flight.hasOne(baggage);

export {flight, gate, baggage};