import User from "../models/users.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// To generate access token
const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
      expiresIn: "6h",  //change a/c to given task
    });
  };


// To generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
      expiresIn: "7d",  //change a/c to given task
    });
  };


// To register the User
const registerUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({
        message: "You must enter email & password",
      });
      return;
    }
    