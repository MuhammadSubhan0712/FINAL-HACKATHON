import User from "../models/users.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// To generate access token
const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
      expiresIn: "6h",
    });
  };

  // To generate refresh token

const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
      expiresIn: "7d",
    });
  };
