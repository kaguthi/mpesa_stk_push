// import 'tsconfig-paths/register';
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './Routes/index.ts';
import mongoose from 'mongoose';  

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to M-pesa STK push');
});

app.use('/api', router);

mongoose.connect(process.env.DATABASE_URL as string, {})
.then(() => console.log('Connected to the database'))
.catch((err) => console.error('Database connection error:', err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});