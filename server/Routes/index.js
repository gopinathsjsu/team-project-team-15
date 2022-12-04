import express from "express";

import * as flightscontroller from "../Controllers/Flights.js";
import * as gatescontroller from "../Controllers/Gates.js";
import * as baggagecontroller from "../Controllers/Baggages.js";
import * as passengercontroller from "../Controllers/Passengers.js";
import path from 'path';
import session from "express-session";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import * as logincontroller from '../Controllers/Login.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express.Router();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true, 
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.post('/api/v1/login', logincontroller.get);
app.get('/api/v1/flights/', flightscontroller.getAllFlights);
app.get('/api/v1/flights/:id', flightscontroller.getFlightById);
app.post('/api/v1/flights/', flightscontroller.AddFlight);
app.patch('/api/v1/flights/:id', flightscontroller.updateFlight);
app.delete('/api/v1/flights/:id', flightscontroller.deleteFlight);

app.get('/api/v1/gates/rgate', gatescontroller.randomGate);
app.get('/api/v1/gates/enabledgates', gatescontroller.getEnabledGates);
app.get('/api/v1/gates/disabledgates', gatescontroller.getDisabledGates);
app.get('/api/v1/gates/:id', gatescontroller.getGatebyID);
app.post('/api/v1/gates/assigngate/:terminal/:gate', gatescontroller.assignGate);
app.post('/api/v1/gates/unassigngate/:terminal/:gate', gatescontroller.unassignGate);
app.patch('/api/v1/gates/enablegate/:terminal/:gate', gatescontroller.enableGate);
app.patch('/api/v1/gates/disablegate/:terminal/:gate', gatescontroller.disableGate);

app.get('/api/v1/baggages', baggagecontroller.getAllBaggages);
app.get('/api/v1/baggages/rbaggage/:terminal', baggagecontroller.randomBaggage);
app.get('/api/v1/baggages/:id', baggagecontroller.getBaggagebyID);
app.post('/api/v1/baggages/assignBaggage/:terminal/:baggage', baggagecontroller.assignBaggage);
app.post('/api/v1/baggages/unassignBaggage/:terminal/:baggage', baggagecontroller.dismissBaggage);
 
export default app;