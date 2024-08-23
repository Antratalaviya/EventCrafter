import { Request, Response } from "express";
import status from 'http-status';
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import { EventInput } from "../constants";
import { AppString } from "../utils/appString";
import eventService from "../service/event.service";


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

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.EVENT_CREATED)
            );

    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getEvent = asyncHandler(async (req: Request, res: Response) => {
    try {

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

        let event = await eventService.getEventByUserId(req.user._id, page, limit, keyword, eventStatus, eventType, sortby);
        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, { event }, AppString.EVENT_RETRIEVED)
            );
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
    getEvent
}