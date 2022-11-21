import { Sequelize } from "sequelize";

const db = new Sequelize('AIRLINE_SYSTEM', 'admin', 'admin202', {
    host: "mysql202.cyykoabfoj9g.us-east-1.rds.amazonaws.com",
    port: "3306",
    dialect: "mysql"
});

export default db;

