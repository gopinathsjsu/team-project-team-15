import express from "express";
 
import { 
    getGroupGates,
    EnableGate
} from "../Controllers/Flights.js";

const router = express.Router();


router.get('/GroupGates', getGroupGates);
router.patch('/enableGate/:terminal/:gate', EnableGate);

export default router;