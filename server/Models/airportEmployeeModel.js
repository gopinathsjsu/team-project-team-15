import db from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;


const airportEmployee = db.define('AIRPORT_EMPLOYEE',{
    EMPLOYEE_NAME:{
        type: DataTypes.STRING
    },
    EMPLOYEE_ID:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    EMPLOYEE_EMAIL:{
        type: DataTypes.STRING
    },
    EMPLOYEE_PASSWORD: {
        type: DataTypes.STRING
    },
    EMPLOYEE_MOBILE: {
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

export default airportEmployee;
