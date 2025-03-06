import express from 'express';
import 'dotenv/config';
import { prisma } from './prisma';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

// Middleware to block users who have already visited
app.use((req, res, next) => {
  if (req.cookies['visited'] === '1') {
    return res.redirect(302, 'https://visited.example.com');
  }
  res.cookie('visited', '1', { maxAge: 1000 * 60 * 60 * 24 * 365 });
  next();
});

// Routes will go here

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});