import express from "express";
 
import { 
    getAllFlights,
    getFlightById,
    AddFlight,
    updateFlight,
    deleteFlight
} from "../Controllers/Flights.js";

const router = express.Router();
 
router.get('/', getAllFlights);
router.get('/:id', getFlightById);
router.post('/', AddFlight);
router.patch('/:id', updateFlight);
router.delete('/:id', deleteFlight);
 
export default router;