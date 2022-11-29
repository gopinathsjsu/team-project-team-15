import express from "express";
 
import { 
    getAllFlights,
    getFlightById,
    AddFlight,
    updateFlight,
    deleteFlight,
} from "../Controllers/Flights.js";

import { 
    getAllGates,
    randomGate,
    assignGate,
    unassignGate,
    enableGate,
    disableGate
} from "../Controllers/Gates.js";

import { 
    getAllBaggages,
    randomBaggage,
//    assignBaggage,
//    dismissBaggage
} from "../Controllers/Baggages.js";

const app = express.Router();
 
app.get('/api/v1/flights/', getAllFlights);
app.get('/api/v1/flights/:id', getFlightById);
app.post('/api/v1/flights/', AddFlight);
app.patch('/api/v1/flights/:id', updateFlight);
app.delete('/api/v1/flights/:id', deleteFlight);

app.get('/api/v1/gates', getAllGates);
app.get('/api/v1/rgate', randomGate);
app.post('/api/v1/assigngate/:terminal/:gate', assignGate);
app.post('/api/v1/unassigngate/:terminal/:gate', unassignGate);
app.post('/api/v1/enablegate/:terminal/:gate', enableGate);
app.post('/api/v1/disablegate/:terminal/:gate', disableGate);

app.get('/api/v1/baggages', getAllBaggages);
app.get('/api/v1/rbaggages', randomBaggage);
{/*
app.post('/api/v1/assignBaggage/:terminal/:baggage', assignBaggage);
app.post('/api/v1/unassignBaggage/:terminal/:baggage', dismissBaggage);
*/}
 
export default app;