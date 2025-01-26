import express from "express";

import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshToken,
} from "../controllers/admin.controller.js";


const router = express.Router();

// To register User
router.post("/register", registerAdmin);

// To login User

router.post("/login", loginAdmin);

// To logout User

router.post("/logout", logoutAdmin);

// To refresh token

router.post("/refreshtoken", refreshToken);

export default router;