import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// connect to database
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  // origin: 'http://localhost:3000' || 'http://192.168.0.106:3000' || '*', // development
  origin: 'https://mern-auth-jwt.vercel.app' || '*', // production
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'API running' });
  });
}

// error middlewares must go after all other routes
app.use(notFound);
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// AUTH ROUTES:
// POST /api/users - Register a user
// POST /api/users/auth - Authenticate a user and get token
// POST /api/users/logout - Logout user and clear cookie
// GET /api/users/profile - Get user profile
// PUT /api/users/profile - Update profile
