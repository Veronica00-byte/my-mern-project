import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';

import templeRoutes from './Routes/templeRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import authRoutes from './Routes/authRoutes.js'; // <-- Add this

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/temples', templeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // <-- Add this

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
};

startServer();