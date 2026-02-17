const express=require("express");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json("Access denied. Please login.");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next(); // continue to controller

  } catch (error) {
    return res.status(401).json("Invalid or expired token");
  }
};

module.exports = authMiddleware;
