import express, { request } from "express";
import db from "./config/database.js";
import Routes from "./routes/index.js";
import cors from "cors";
import cron from "node-cron";
import { gatecronfunction, maintaingatetemp } from "./Controllers/Schedulers/GateSchedulerFile.js";
import { baggagecronfunction, maintainbagtemp } from "./Controllers/Schedulers/BaggageSchedulerFile.js";

const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

maintaingatetemp();
maintainbagtemp();
cron.schedule("*/20 * * * * *", () => {
  gatecronfunction();
  baggagecronfunction();
});

global.db = db;
app.use(cors());
app.use(express.json());
app.use('/', Routes);
app.listen(5001, () => console.log('Server running at port 5001'));
