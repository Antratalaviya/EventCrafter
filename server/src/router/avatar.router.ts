import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import avatarController from '../controller/avatar.controller';

const router = express.Router();

router.get("/", authMiddleware.verifyUserAccess, avatarController.getAllAvatar);
router.post("/", authMiddleware.verifyUserAccess, avatarController.createAvatar);

export default router