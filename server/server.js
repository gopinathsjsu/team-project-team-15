import express, { request } from "express";
import db from "./config/database.js";
import Routes from "./routes/index.js";
import cors from "cors";
import cron from "node-cron";
import { cronfunction, maintaintemp } from "./Controllers/SchedulerFile.js";

const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

maintaintemp();
cron.schedule("*/20 * * * * *", () => {
  //cronfunction();
});

global.db = db;
app.use(cors());
app.use(express.json());
app.use('/', Routes);
app.listen(5001, () => console.log('Server running at port 5001'));
