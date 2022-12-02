import { Sequelize } from "sequelize";
import airportEmployee from "../Models/airportEmployeeModel.js";


export const getAirport = async (req, res) => {
    try {
        const airportEmployees = await airportEmployee.findOne({ where: { EMPLOYEE_NAME: req.body.name, EMPLOYEE_PASSWORD: req.body.password}});
        if (JSON.stringify(airportEmployees).length > 0) {
            // Authenticate the user
            req.session.loggedin = true;
            req.session.name = req.body.name;
            // Redirect to home page
            res.json({'token': Math.random(6),'isSuccess':`Welcome back!! ${req.session.name}`, 'isLogged': true});
        } else {
            res.json({'isSuccess':'Incorrect Username and/or Password!', 'isLogged': false});
        }			
        console.log(JSON.stringify(airportEmployees, null, 1))
    } catch (error) {
        res.json({ message: error.message });
    }  
}

