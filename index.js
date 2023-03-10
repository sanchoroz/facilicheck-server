import mongoose from 'mongoose';
import express from 'express';
import config from 'config';
import cookieParser from 'cookie-parser';
import authRouter from '../server/routes/auth.routes.js';
import gardenRouter from '../server/routes/garden.routes.js';
import facilityRouter from '../server/routes/facility.routes.js';
import monthlyReportRouter from './routes/monthlyReport.routes.js';
import { errorMiddleware } from './middlewares/errors.js';
import cors from './middlewares/cors.js';
const PORT = process.env.PORT || config.get('serverPort');
const dburl = config.get('dburl');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors);
app.use('/api/auth', authRouter);
app.use('/api/garden', gardenRouter);
app.use('/api/facility', facilityRouter);
app.use('/api/report', monthlyReportRouter);
app.use(errorMiddleware);

const start = () => {
  try {
    mongoose.connect(dburl);
    app.listen(PORT, () => {
      console.log('server started');
    });
  } catch (error) {}
};

start();
