import db from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;


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

export default baggage;
