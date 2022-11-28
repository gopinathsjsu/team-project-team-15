import express from "express";
 
import { 
    getAllEnabledGates,
    getAllDisabledGates
} from "../Controllers/Flights.js";

const router = express.Router();

router.get('/EnabledGates', getAllEnabledGates);
router.get('/DisabledGates', getAllDisabledGates);
export default router;