import User from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";

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
// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use true for 465 port, otherwise false
  auth: {
    user: "wendell73@ethereal.email",
    pass: "DDMD3KjKbRmMnn1Xuc",
  },
});

// Generate a random password function
const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString("hex"); // Generates an 8-byte hexadecimal password
};

// Send Email function
const sendEmail = async (email, name, randomPassword) => {
  return transporter.sendMail({
    from: '"Muhammad Subhan Khan" <muhammadsubhan0712@gmail.com>',
    to: email, // The recipient email from the user request
    subject: "Welcome to the platform!",
    text: `Hello ${name}, your password is: ${randomPassword}`,
    html: `<b>Hello ${name}, your password is: ${randomPassword}</b>`,
  });
};

// To register the User
const registerUser = async (req, res) => {
  const { cnic, email, name } = req.body;

  if (!cnic || !email || !name) {
    res.status(400).json({
      message: "You must enter cnic email name & password",
    });
    return;
  }
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(401).json({
      message: "User Already Exist",
    });
  }
  // Generate a random password for the user
  const randomPassword = generateRandomPassword();

  // Hash the password
  const hashPassword = await bcrypt.hash(randomPassword, 10);
  try {
    const createUser = await User.create({
      cnic,
      email,
      name,
      password: hashPassword,
    });
    res.json({
      message: "User Registered Successfully",
      data: createUser,
    });

    // Send email with the random password
    const info = await sendEmail(email, name, randomPassword);

    console.log("Message sent: %s", info.messageId);

    res.status(201).json({
      emailSent: true,
      emailId: info.messageId,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
  try {
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
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};

// Reset password function
export const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new random password
    const newRandomPassword = generateRandomPassword();

    // Hash the new password
    const hashPassword = await bcrypt.hash(newRandomPassword, 10);

    // Update the user's password with the new one
    user.password = hashPassword;
    await user.save();

    // Send email with the new password
    const info = await sendEmail(email, user.name, newRandomPassword);
    console.log("Password reset email sent: %s", info.messageId);

    res.status(200).json({
      emailSent: true,
      emailId: info.messageId,
      message: "Password reset successfully. Please check your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To logout user
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.json({
      message: "User Logout Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: message.error });
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!refreshToken) {
    res.status(401).json({
      message: "!No Refresh Token Found!",
    });
    return;
  }
  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET
    );

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
  } catch (error) {
    res.status.json({ message: message.error });
  }
};

export { registerUser, loginUser, logoutUser, refreshToken };
