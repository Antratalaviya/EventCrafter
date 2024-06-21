import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import authController from "../controller/auth.controller";

const router = express.Router();

router.post("/sign-up", authController.register);

router.post("/sign-in", authController.login);

router.patch(
  "/sign-out",
  authMiddleware.verifyUserAccess,
  authController.logout
);

export default router;
