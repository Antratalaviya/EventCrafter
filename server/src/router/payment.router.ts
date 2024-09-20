import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import paymentController from '../controller/payment.controller';

const router = express.Router();

router.post('/create-checkout-session', paymentController.createCheckoutSession);

router.get('/session-status', paymentController.sessionStatus);

export default router;