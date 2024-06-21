require('dotenv').config();


import express from 'express';
import mongoose from 'mongoose';
import cors = require('cors');
import bodyParser from 'body-parser';
import staffRoutes from './routes/staff';
import attendanceRoutes from './routes/attendance';
import paymentRoutes from './routes/payments';
import authRoutes from './routes/auth';
import { Request, Response } from 'express';
import { authMiddleware } from './controllers/auth';



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors<Request>());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI || 'mongodb+srv://sparkyvids:VshiiFobWB0oDgQt@staffify.aysa3gi.mongodb.net/';
mongoose.connect(uri)
.then(() => console.log('Staffify database is connected'))
.catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use('/api/auth', authRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/attendance',authMiddleware, attendanceRoutes);
app.use('/api/payments',authMiddleware, paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
})

app.use((err:any, req:Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});