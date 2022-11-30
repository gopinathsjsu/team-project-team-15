import express from "express";
 
import { 
    getAllEnabledGates,
    getAllDisabledGates,
    getTerminals,
    getGroupGates
} from "../Controllers/Flights.js";

const router = express.Router();

router.get('/EnabledGates', getAllEnabledGates);
router.get('/DisabledGates', getAllDisabledGates);
router.get('/Terminals', getTerminals);
router.get('/GroupGates', getGroupGates);
export default router;