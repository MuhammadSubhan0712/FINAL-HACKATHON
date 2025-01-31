import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// To generate access token
const generateAccessToken = (admin) => {
  return jwt.sign({ email: admin.email }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "6h", //change a/c to given task
  });
};

// To generate refresh token
const generateRefreshToken = (admin) => {
  return jwt.sign({ email: admin.email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "7d", //change a/c to given task
  });
};

// To register the User
const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      message: "You must enter cnic email & name",
    });
    return;
  }
  const existAdmin = await Admin.findOne({ email: email });
  if (existAdmin) {
    res.status(401).json({
      message: "Admin account already exist",
    });
  }
  const createAdmin = await Admin.create({
    username,
    email,
    password,
  });
  res.json({
    message: "Admin Registered Successfully",
    data: createAdmin,
  });
};

// To Login User
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "You must enter email & password",
    });
    return;
  }
  const existAdmin = await Admin.findOne({ email });

  if (!existAdmin) {
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
const logoutAdmin = async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({
    message: "Admin Logout Successfully",
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

  const user = await Admin.findOne({ email: decodedToken.email });

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

export { registerAdmin, loginAdmin, logoutAdmin, refreshToken };
