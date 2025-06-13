import express from 'express';
import mongoose from 'mongoose';
import songRoutes from './routes/songRoutes';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', songRoutes);

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

export default app;