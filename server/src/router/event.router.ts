import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import eventController from '../controller/event.controller';
// import cacheData from '../cache/cacheData';

const router = express.Router();

router.post('/', authMiddleware.verifyUserAccess, eventController.createEvent)

// router.get('/', authMiddleware.verifyUserAccess, cacheData.allEvents, eventController.getAllEvents);
router.get('/', authMiddleware.verifyUserAccess, eventController.getAllEvents);
// router.get('/own', authMiddleware.verifyUserAccess, cacheData.ownEvents, eventController.getOwnEvents);
router.get('/own', authMiddleware.verifyUserAccess, eventController.getOwnEvents);
router.get('/own/public/:userId', authMiddleware.verifyUserAccess, eventController.getOwnPublicEvents);
router.get('/:eventId', authMiddleware.verifyUserAccess, eventController.getFullEvent);


router.post('/like/:eventId', authMiddleware.verifyUserAccess, eventController.likeEvent);
router.post('/save/:eventId', authMiddleware.verifyUserAccess, eventController.saveEvent);

router.post('/cancel/:eventId', authMiddleware.verifyUserAccess, eventController.cancelEvent);  //to test

router.get('/participants/:eventId', authMiddleware.verifyUserAccess, eventController.getAllParticipants);

router.put('/status/:eventId', authMiddleware.verifyUserAccess, eventController.updateEventStatus);

export default router;

/**
 * {
    "type":"private",
    "category":"birthday party",
    "title":"birthday party",
    "subtitle1":"sub1",
    "subtitle2":"sub2",
    "offers": [
        "food"
    ],
    "street":"abc",
    "city":"surat",
    "country":"india",
    "carCapacity":"20",
    "startDate":"2024-08-24",
    "endDate":"2024-08-30",
    "startTime":"05:00",
    "endTime":"13:00",
    "photos":[
        {
            "url":"abc"
        }
    ],
    "pdfFile" : [{
        "url":"abc"
    }],
    "description":"abc"
}
 */