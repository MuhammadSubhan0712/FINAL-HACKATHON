import User from "../models/users.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload an image
const uploadImageToCloudinary = async (localpath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localpath);
    return uploadResult.url;
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error Occured ==>",
      error,
    });
    fs.unlinkSync(localpath);
    return null;
  }
};

// To generate access token
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "6h", //change a/c to given task
  });
};

// To generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "7d", //change a/c to given task
  });
};

// To register the User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      message: "You must enter username email & password",
    });
    return;
  }
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(401).json({
      message: "User Already Exist",
    });
  }
  const createUser = await User.create({
    username,
    email,
    password,
  });
  res.json({
    message: "User Registered Successfully",
    data: createUser,
  });
};

// To Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "You must enter email & password",
    });
    return;
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      message: "!No user found!",
    });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({
      message: "Incorrect Password",
    });
  }
  // Cookies
  res.cookie("refreshToken", refreshToken, { http: true, secure: false });
  res.status(200).json({
    message: "User LoggedIn Successfully",
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
    data: user,
  });
};

// To logout user
const logoutUser = async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({
    message: "User Logout Successfully",
  });
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!refreshToken) {
    res.status(401).json({
      message: "!No Refresh Token Found!",
    });
    return;
  }

  const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

  const user = await User.findOne({ email: decodedToken.email });

  if (!user) {
    res.status(404).json({
      message: "Invalid Token",
    });
    return;
  }
  const generateToken = generateAccessToken(user);
  res.json({
    message: "Access Token Generated",
    accessToken: generateToken,
  });
  res.json({ decodedToken });
};

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No image file uploaded",
    });
  }

  try {
    const uploadResult = await uploadImageToCloudinary(req.file.path);

    if (!uploadResult) {
      return res.status(500).json({
        message: "Error occured while uploading image",
      });
    }

    res.json({
      message: "Image Uploaded Successfully",
      url: uploadResult,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Occured while uploading image" });
  }
};

export { registerUser, loginUser, logoutUser, refreshToken , uploadImage};
