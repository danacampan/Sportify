import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import eventRouter from './routes/eventRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
const port = 5000;
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
