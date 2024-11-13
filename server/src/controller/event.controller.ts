import { Request, Response } from "express";
import status from 'http-status';
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import { EventInput } from "../constants";
import { AppString } from "../utils/appString";
import eventService from "../service/event.service";
import userService from "../service/user.service";
import notificationService from "../service/notification.service";
import invitationService from "../service/invitation.service";
import mongoose from "mongoose";
// import { redisClient } from "../dbConnection/redisConfig";


const createEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const event: EventInput = req.body;

        let startDate = new Date(event.startDate)
        let endDate = new Date(event.endDate)

        if ((endDate.getTime() - startDate.getTime()) < 0) {
            return res.status(status.BAD_REQUEST).json(new ApiError(status.BAD_REQUEST, AppString.INVALID_DATE))
        }

        let newEvent = await eventService.createEvent(user._id, event);
        if (!newEvent) {
            return res.status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.EVENT_CREATION_FAILED)
                );
        }
        const eventCreated = await eventService.getFullEventByEventId(newEvent._id.toString())

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, eventCreated, AppString.EVENT_CREATED)
            );

    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getOwnEvents = asyncHandler(async (req: Request, res: Response) => {
    try {
        // let { page, } = req.query; it is required that's why we can't use
        let page: number =
            typeof req.query?.page === "string"
            && parseInt(req.query?.page) || 1;
        let limit: number =
            typeof req.query?.limit === "string"
            && parseInt(req.query?.limit) || 10;

        let keyword = typeof req.query?.keyword === "string"
            && req.query?.keyword || "";
        let eventStatus = typeof req.query?.status === "string"
            && req.query?.status || "";

        let eventType = typeof req.query?.type === "string"
            && req.query?.type || "";
        let sortby = typeof req.query?.sortby === "string"
            && req.query?.sortby || "";
        // let eventExist = await eventService.getEventByUserId(req.user._id)
        // if (!eventExist) {
        //     return;
        // }
        // if (new Date(eventExist?.startDate).getTime() >= new Date(Date.now()).getTime()) {
        //     if (eventExist.status !== 'cancelled') {
        //         eventExist.status = 'upcoming'
        //     }

        // } else if (new Date(eventExist?.endDate).getTime() <= new Date(Date.now()).getTime()) {
        //     if (eventExist.status !== 'cancelled') {
        //         eventExist.status = "completed"
        //     }
        // }
        // await eventExist.save();
        let event = await eventService.getOwnEventsByUserId(req.user._id, page, limit, keyword, eventStatus, eventType, sortby);

        if (!event || event.length === 0) {
            return res.status(status.OK)
                .json(
                    new ApiResponse(status.OK, [], AppString.EVENT_RETRIEVED)
                );
        }

        // await redisClient.set(`ownEvents?page=${page}&limit=${limit}&keyword=${keyword}&status=${eventStatus}&type=${eventType}&sortby=${sortby}`, JSON.stringify(event), {
        //     EX: 60 * 60,
        //     NX: true
        // })

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, event, AppString.EVENT_RETRIEVED)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getOwnPublicEvents = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        let page: number =
            typeof req.query?.page === "string"
            && parseInt(req.query?.page) || 1;
        let limit: number =
            typeof req.query?.limit === "string"
            && parseInt(req.query?.limit) || 10;

        let event = await eventService.getOwnPublicEventsByUserId(userId, page, limit);

        if (!event || event.length === 0) {
            return res.status(status.OK)
                .json(
                    new ApiResponse(status.OK, [], AppString.EVENT_RETRIEVED)
                );
        }

        // await redisClient.set(`ownEvents?page=${page}&limit=${limit}&keyword=${keyword}&status=${eventStatus}&type=${eventType}&sortby=${sortby}`, JSON.stringify(event), {
        //     EX: 60 * 60,
        //     NX: true
        // })

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, event, AppString.EVENT_RETRIEVED)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getFullEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        let event = await eventService.getFullEventByEventId(eventId);

        if (!event) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.EVENT_NOT_EXIST)
                );
        }

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, event, AppString.EVENT_RETRIEVED)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const likeEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id
        const event = await eventService.getEventById(eventId);

        if (!event) {
            return res
                .status(status.NOT_FOUND)
                .json(new ApiError(status.NOT_FOUND, AppString.EVENT_NOT_FOUND));
        }

        let likeSavedUser = await userService.likeEventByUser(eventId, userId);
        let likeSavedEvent = await eventService.eventLikedByUser(eventId, userId);

        if (!likeSavedUser || !likeSavedEvent) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(new ApiError(status.INTERNAL_SERVER_ERROR, AppString.EVENT_NOT_LIKED));
        }

        // await redisClient.del("allEvents?page=1&limit=10&keyword=&type=&sortby=");

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.EVENT_LIKED)
            );

    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const saveEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id
        const event = await eventService.getEventById(eventId);

        if (!event) {
            return res
                .status(status.NOT_FOUND)
                .json(new ApiError(status.NOT_FOUND, AppString.EVENT_NOT_FOUND));
        }

        let savedEventUser = await userService.saveEventByUser(eventId, userId);

        if (!savedEventUser) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(new ApiError(status.INTERNAL_SERVER_ERROR, AppString.EVENT_NOT_SAVED));
        }

        // await redisClient.del("allEvents?page=1&limit=10&keyword=&type=&sortby=");

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.EVENT_SAVED)
            );

    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const cancelEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const event = await eventService.getEventById(eventId);

        if (!event) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.EVENT_NOT_EXIST)
                );
        }
        const owner = await userService.getUserById(event.owner);
        if (!owner) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.EVENT_OWNER_NOT_EXIST)
                );
        }
        if (owner._id.toString() !== req.user._id.toString()) {
            return res
                .status(status.UNAUTHORIZED)
                .json(
                    new ApiError(status.UNAUTHORIZED, AppString.USER_NOT_OWNER)
                );
        }

        let eve = await eventService.updateEventStatus(eventId, "cancelled")
        return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.EVENT_CANCEL))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getAllEvents = asyncHandler(async (req: Request, res: Response) => {
    try {
        let page: number =
            typeof req.query?.page === "string"
            && parseInt(req.query?.page) || 1;
        let limit: number =
            typeof req.query?.limit === "string"
            && parseInt(req.query?.limit) || 10;

        let keyword = typeof req.query?.keyword === "string"
            && req.query?.keyword || "";

        let eventType = typeof req.query?.type === "string"
            && req.query?.type || "";
        let sortby = typeof req.query?.sortby === "string"
            && req.query?.sortby || "";

        let events = await eventService.getAllEvents(req.user._id, page, limit, keyword, eventType, sortby);
        if (!events || events.length === 0) {
            return res.status(status.OK)
                .json(
                    new ApiResponse(status.OK, [], AppString.EVENT_RETRIEVED)
                );
        }

        // await redisClient.set(`allEvents?page=${page}&limit=${limit}&keyword=${keyword}&type=${eventType}&sortby=${sortby}`, JSON.stringify(events), {
        //     EX: 60 * 60,
        //     NX: true
        // });

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, events, AppString.EVENT_RETRIEVED)
            );

    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getAllParticipants = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id;
        const participants = await eventService.getAllParticipants(userId, eventId);

        if (!participants) {
            return res
                .status(status.OK)
                .json(
                    new ApiResponse(status.OK, {}, AppString.NO_PARTICIPANT)
                );
        }

        return res.status(status.OK).json(new ApiResponse(status.OK, participants, AppString.PARTICIPANTS))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const updateEventStatus = asyncHandler(async (req: Request, res: Response) => {
    try {
        const events = await eventService.getEvents();
        const updatedEvents = events.map(async (event) => {
            if (new Date(event?.startDate) >= new Date()) {
                if (event.status !== 'cancelled' && event.status !== "draft") {
                    event.status = 'upcoming'
                }

            } else if (new Date(event?.endDate) <= new Date()) {
                if (event.status !== 'cancelled' && event.status !== "draft") {
                    event.status = "completed"
                }
            }
            await event.save()
            return event
        })
        return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.EVENT_UPDATED))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const eventPaymentDone = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const { eventStatus } = req.body;

        await eventService.updateEventStatus(eventId, eventStatus);

        return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.EVENT_UPDATED))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})


const updateEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const updatedEvent = await eventService.updateEvent(eventId, req.body)
        if (!updatedEvent) {
            return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.EVENT_UPDATED))/////
        }
        return res.status(status.OK).json(new ApiResponse(status.OK, updatedEvent, AppString.EVENT_UPDATED))/////
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

export default {
    createEvent,
    getOwnEvents,
    getFullEvent,
    likeEvent,
    saveEvent,
    cancelEvent,
    getAllEvents,
    getAllParticipants,
    updateEventStatus,
    getOwnPublicEvents,
    updateEvent,
    eventPaymentDone
}