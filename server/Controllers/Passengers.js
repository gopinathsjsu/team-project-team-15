import { Sequelize } from "sequelize";
import passenger from "../Models/passengerModel.js";

export const getPassenger = async (req, res) => {
    try {
        console.log("pass")
        const passengers = await passenger.findOne({ where: { PASSENGER_NAME: req.body.name, PASSENGER_PASSWORD: req.body.password}});
        if (JSON.stringify(passengers).length > 0) {
            // Authenticate the user
            req.session.loggedin = true;
            req.session.name = req.body.name;
            // Redirect to home page
            res.json({'token': Math.random(6),'isSuccess':`Welcome back!! ${req.session.name}`, 'isLogged': true});
        } else {
            res.json({'isSuccess':'Incorrect Username and/or Password!', 'isLogged': false});
        }			
        console.log(JSON.stringify(passengers, null, 1))
    } catch (error) {
        res.json({ message: error.message });
    }  
}

