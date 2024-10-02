import { Request, Response } from "express";
import userService from "../service/user.service";
import { AppString } from "../utils/appString";
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import status from 'http-status'
import connectionService from "../service/connection.service";
import notificationService from "../service/notification.service";

const sendConnectionRequest = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { recipientId } = req.params;
        if (recipientId === req.user._id.toString()) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.RECIPIENT_IS_OWNER)
                );
        }
        const connectionExist = await connectionService.connectionExist(req.user._id, recipientId);

        if (connectionExist.length > 0) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.REQ_ALREADY_SENT)
                );
        }
        const user = await userService.getUserById(recipientId)

        if (!user) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.USER_NOT_EXIST)
                );
        }

        const sendRequest = await connectionService.sendRequest(req.user._id, recipientId);

        if (!sendRequest) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED)
                );
        }

        await notificationService.createNotification({
            type: "connection",
            message: `${req.user.name} ${req.user.surname} Has Requested to Connect`,
            sender: req.user._id,
            recipient: user._id,
        })

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, sendRequest, AppString.REQUEST_SEND)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const acceptConnectionRequest = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { connectionId } = req.params;
        const connection = await connectionService.getConnectionReqById(connectionId)
        const recipient = await userService.getUserById(connection?.recipient!)

        if (!recipient || !connection) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, `${AppString.USER_NOT_EXIST} or ${AppString.REQ_NOT_EXIST}`)
                );
        }

        const acceptRequest = await connectionService.acceptRequest(connectionId);

        if (!acceptRequest) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED)
                );
        }

        await userService.addUserToFriend(req.user._id, recipient._id);

        await notificationService.createNotification({
            type: "connection",
            message: `${recipient.name} ${recipient.surname} Has Accepted Your Connection Request`,
            sender: recipient._id,
            recipient: connection.sender!,
        })
        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.ACCEPT_REQUEST)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const rejectConnectionRequest = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { connectionId } = req.params;
        const connection = await connectionService.getConnectionReqById(connectionId)
        const recipient = await userService.getUserById(connection?.recipient!)

        if (!recipient || !connection) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, `${AppString.USER_NOT_EXIST} or ${AppString.REQ_NOT_EXIST}`)
                );
        }

        const rejectRequest = await connectionService.rejectRequest(connectionId);

        if (!rejectRequest) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED)
                );
        }

        await notificationService.createNotification({
            type: "connection",
            message: `${recipient.name} ${recipient.surname} Has Rejected Your Connection Request`,
            sender: recipient._id,
            recipient: connection.sender!,
        })

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.REJECT_REQUEST)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getAllConnectionRequest = asyncHandler(async (req: Request, res: Response) => {
    try {

        const connectionRequests = await connectionService.getAllConnectionRequest(req.user._id);

        if (!connectionRequests) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED)
                );
        }

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, connectionRequests, AppString.ACCEPT_REQUEST)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getConnectionExist = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { recipientId } = req.params;
        const connectionExist = await connectionService.connectionExist(req.user._id, recipientId);
        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, connectionExist, AppString.ACCEPT_REQUEST)
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
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    getAllConnectionRequest,
    getConnectionExist
}