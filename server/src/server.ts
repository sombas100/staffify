import express from 'express';
import mongoose from 'mongoose';
import cors = require('cors')
import bodyParser from 'body-parser';
import staffRoutes from './routes/staff';
import attendanceRoutes from './routes/attendance';
import paymentRoutes from './routes/payments';
import { Request } from 'express';;



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors<Request>());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
mongoose.connect('mongodb+srv://sparkyvids:VshiiFobWB0oDgQt@staffify.aysa3gi.mongodb.net/')
.then(() => console.log('Staffify database is connected'))
.catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use('/api/staff', staffRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
})