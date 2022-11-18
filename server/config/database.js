import { Sequelize } from "sequelize";

const db = new Sequelize('AIRLINE_SYSTEM', 'admin', 'admin202', {
    host: "mysql202.cyykoabfoj9g.us-east-1.rds.amazonaws.com",
    port: "3306",
    dialect: "mysql"
});

export default db;

{/*
const db = mysql.createConnection({
    host: 'mysql-test.ch384qrfexh2.us-east-1.rds.amazonaws.com',
    database: 'AIRLINE_SYSTEM',
    port: 3306,
    user: 'admin',
    password: 'admin_123'
});

var mysql = require('mysql');

export default db;

*/}

