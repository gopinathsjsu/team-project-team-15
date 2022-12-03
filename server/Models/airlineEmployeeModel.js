import db from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;


const airlineEmployee = db.define('AIRLINE_EMPLOYEE',{
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
    },
    AIRLINE_CODE: {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

export default airlineEmployee;
