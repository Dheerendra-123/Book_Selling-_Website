import jwt from 'jsonwebtoken';
import { userModel } from '../Model/UserModel.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Login first", success: false });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};
