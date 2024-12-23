import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import propertyController from '../controller/property.controller';
import bookPropertyController from '../controller/book.property.controller';

const router = express.Router();

router.get('/', authMiddleware.verifyUserAccess, propertyController.getProperties);
router.get('/own', authMiddleware.verifyUserAccess, propertyController.getOwnProperty);


router.post('/', authMiddleware.verifyUserAccess, propertyController.createProperty);


router.post('/book', authMiddleware.verifyUserAccess, bookPropertyController.bookProperty);

export default router;