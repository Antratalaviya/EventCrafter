import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import status from 'http-status'
import { AppString } from "../utils/appString";
import chatService from "../service/chat.service";

const createChat = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { secondId } = req.params;
        const firstId = req.user._id;

        const conversationExist = await chatService.conversationExist(firstId, secondId);

        return res.status(status.OK).json(new ApiResponse(status.OK, conversationExist, AppString.CHAT_RETRIEVED))

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
});

const findUserChats = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;

        const userChats = await chatService.findUserChat(userId);

        return res.status(status.OK).json(new ApiResponse(status.OK, userChats, AppString.CHAT_RETRIEVED))

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
});

export default {
    createChat,
    findUserChats
}