import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import authController from "../controller/auth.controller";

const router = express.Router();

router.post("/sign-up", authController.register);

router.post("/sign-in", authController.login);

router.post("/refresh", authController.refreshToken);

router.patch("/sign-out", authMiddleware.verifyUserAccess, authController.logout);

router.post("/send-otp", authController.sendOtp);

router.post("/verify-otp", authController.verifyOtp);

export default router;
