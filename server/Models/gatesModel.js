import db from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const gate = db.define('GATES',{
    FLIGHT_CODE:{
        type: DataTypes.STRING
    },
    TERMINAL_NUMBER:{
        type: DataTypes.INTEGER
    },
    GATE_NUMBER:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

export default gate;
