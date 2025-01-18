import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info (id, role) to req
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token." });
  }
};

// Role-based authorization
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ message: "Access denied. Limited permissions / access." });
    }
    next();
  };
};





