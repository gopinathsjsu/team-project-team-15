import express from "express";
 
import { 
    getDisabledGates,
    EnableGate,
    getEnabledGates,
    DisableGate
} from "../Controllers/Flights.js";

const router = express.Router();


router.get('/DisabledGates', getDisabledGates);
router.patch('/enableGate/:terminal/:gate', EnableGate);
router.get('/enabledGates', getEnabledGates);
router.patch('/disableGate/:terminal/:gate', DisableGate);

export default router;