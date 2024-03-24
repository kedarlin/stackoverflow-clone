import dotenv from 'dotenv';
import express from 'express';
import { json } from 'express';
import userRoutes from './routes/userRoutes/user.route.js';
import authRoutes from './routes/auth.route.js';
import questionRoutes from './routes/question.route.js';
import connect from './connection.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connect();

app.use(json());
app.use(cookieParser());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});