import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import conversationController from '../controller/chat.controller';

const router = express.Router();

router.get("/", authMiddleware.verifyUserAccess, conversationController.findUserChats);
router.post("/:secondId", authMiddleware.verifyUserAccess, conversationController.createChat);

export default router;