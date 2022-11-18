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
 
export default flight;