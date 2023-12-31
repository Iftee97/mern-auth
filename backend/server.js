import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
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
  // origin: 'http://localhost:3000' || '*', // frontend development server
  origin: 'https://mern-auth-jwt.vercel.app' || '*', // frontend production server
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

// routes
app.use('/api/users', userRoutes);

// home route
app.get('/', (req, res) => {
  res.json({ message: 'API is up and running' });
});

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

// production server hosted on render
