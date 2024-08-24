import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import authController from "../controller/auth.controller";

const router = express.Router();

router.post("/sign-up", authController.register);

router.post("/sign-in", authController.login);

router.patch("/sign-out", authMiddleware.verifyUserAccess, authController.logout);

router.post("/send-otp", authMiddleware.verifyUserAccess, authController.sendOtp);

router.post("/verify-otp", authMiddleware.verifyUserAccess, authController.verifyOtp);

export default router;
