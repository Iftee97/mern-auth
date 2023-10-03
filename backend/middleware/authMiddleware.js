import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log('authorization: >>>>>>>>', authorization);
  if (!authorization) {
    return res.status(401).json({ error: 'authorization token required' })
  }
  const token = authorization.split(' ')[1];
  // console.log('token: >>>>>>>>', token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password'); // exclude password from user object
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "request is not authorized" })
    }
  }
});
