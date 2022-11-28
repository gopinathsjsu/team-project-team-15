import express from "express";
import db from "./config/database.js";
import gateRoutes from "./routes/index.js";
import cors from "cors";
import cron from "node-cron";
 
const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}


cron.schedule(' * * * * *', () => {
  console.log('running a task every minute');
});

global.db = db;
app.use(cors());
app.use(express.json());
app.use('/gates', gateRoutes);
app.listen(5001, () => console.log('Server running at port 5001'));