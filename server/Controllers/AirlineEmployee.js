import { Sequelize } from "sequelize";
import airlineEmployee from "../Models/airlineEmployeeModel.js";


export const getAirline = async (req, res) => {
    try {
        const airlineEmployees = await airlineEmployee.findOne({ where: { EMPLOYEE_NAME: req.body.name, EMPLOYEE_PASSWORD: req.body.password}});
        if (JSON.stringify(airlineEmployees).length > 0) {
            // Authenticate the user
            req.session.loggedin = true;
            req.session.name = req.body.name;
            // Redirect to home page
            res.json({'token': Math.random(6),'isSuccess':`Welcome back!! ${req.session.name}`, 'isLogged': true});
        } else {
            res.json({'isSuccess':'Incorrect Username and/or Password!', 'isLogged': false});
        }			
        console.log(JSON.stringify(airlineEmployees, null, 1))
    } catch (error) {
        res.json({ message: error.message });
    }  
}

