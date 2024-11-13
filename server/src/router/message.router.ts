import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import messageController from '../controller/message.controller';

const router = express.Router();

router.get("/:chatId", authMiddleware.verifyUserAccess, messageController.getMessages);
router.post("/", authMiddleware.verifyUserAccess, messageController.createMessage);

export default router;