import { Request, Response } from "express";
import status from 'http-status'
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import { AppString } from "../utils/appString";
import userService from "../service/user.service";
import notificationService from "../service/notification.service";
import invitationService from "../service/invitation.service";
import eventService from "../service/event.service";
import { redisClient } from "../dbConnection/redisConfig";


const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserProfile(req.user._id)
        const eventsCreated = await eventService.getEventByUserId(req.user._id)
        const newUser = {
            ...user[0],
            events: eventsCreated.length
        }
        await redisClient.set("user", JSON.stringify(newUser), {
            NX: true
        });

        return res.status(status.OK).json(new ApiResponse(status.OK, newUser, AppString.USER_RETRIEVED));
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const savedEventsByUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const eventSaved = await userService.getSavedEventByUser(userId);

        return res.status(status.OK).json(new ApiResponse(status.OK, eventSaved, AppString.SAVED_EVENTS))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const likedEventsByUser = asyncHandler(async (req: Request, res: Response) => {
    // try {
    const userId = req.user._id;
    const eventLiked = await userService.getLikedEventByUser(userId);
    return res.status(status.OK).json(new ApiResponse(status.OK, eventLiked, AppString.LIKED_EVENTS))
    // } catch (error) {
    //     return res
    //         .status(status.INTERNAL_SERVER_ERROR)
    //         .json(
    //             new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
    //         );
    // }
})

const getAllNotification = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const notifications = await notificationService.getAllNotification(userId)
        if (!notifications) {
            return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.NO_NOTIF))
        }
        return res.status(status.OK).json(new ApiResponse(status.OK, notifications, AppString.NOTIFICATIONS))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getAllInvitation = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const invitations = await invitationService.getAllInvitation(userId)
        if (!invitations) {
            return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.NO_INVITATION))
        }
        return res.status(status.OK).json(new ApiResponse(status.OK, invitations, AppString.INVITAIIONS))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const subscribeUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { subscribedToId } = req.params;

        let subscribedToUser = await userService.getUserById(subscribedToId);

        if (!subscribedToUser) {
            return res.status(status.NOT_FOUND).json(new ApiError(status.NOT_FOUND, AppString.USER_NOT_EXIST))
        }

        let updatedUser = await userService.subscribeUser(user._id, subscribedToId);
        if (!updatedUser) {
            return res.status(status.BAD_REQUEST).json(new ApiError(status.BAD_REQUEST, AppString.SUBSCRIBE_FAILED))
        }
        await notificationService.createNotification({
            type: "subscribe",
            message: `${subscribedToUser.name} Started Subscribe You`,
            sender: user._id,
            recipient: user._id,
        })

        return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.SUBSCRIBED))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    try {

        let keyword = typeof req.query?.keyword === "string"
            && req.query?.keyword || "";

        const users = await userService.getAllUsers(keyword)
        return res.status(status.OK).json(new ApiResponse(status.OK, users, AppString.USER_RETRIEVED));
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const updateUserAvatar = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        const updatedUser = await userService.updateAvatar(req.user._id, url);

        if (!updatedUser) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED)
                );
        }

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.AVATAR_UPDATED)
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
    getUserProfile,
    savedEventsByUser,
    getAllNotification,
    getAllInvitation,
    subscribeUser,
    likedEventsByUser,
    getAllUsers,
    updateUserAvatar
}