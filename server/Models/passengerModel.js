import db from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;


const passenger = db.define('PASSENGERS',{
    PASSENGER_NAME:{
        type: DataTypes.STRING
    },
    PASSENGER_AGE:{
        type: DataTypes.INTEGER
    },
    PASSENGER_EMAIL:{
        type: DataTypes.STRING
    },
    PASSENGER_PASSWORD: {
        type: DataTypes.STRING
    },
    PASSENGER_MOBILE_NUMBER: {
        type: DataTypes.INTEGER
    },
    PASSENGER_PASSPORT: {
        type: DataTypes.STRING,
        primaryKey: true
    }
},{
    freezeTableName: true
}, {
    timestamps: false
});

export default passenger;
