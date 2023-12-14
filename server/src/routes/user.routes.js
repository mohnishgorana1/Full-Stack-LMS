import express, { Router } from "express";
import {
  forgotPassword,
  getProfile,
  login,
  logout,
  register,
  resetPassword,
  changePassword,
  updateProfile
} from "../controllers/user.controller.js";

import { isLoggedIn } from "../middlewares/jwtAuth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isLoggedIn, getProfile);
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken', resetPassword);
router.post('/change-password', isLoggedIn, changePassword)
router.put('/update', isLoggedIn, upload.single('avatar'), updateProfile)


export default router;
