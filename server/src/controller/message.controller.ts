import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import status from 'http-status'
import { AppString } from "../utils/appString";
import messageService from "../service/message.service";

const createMessage = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { text, image } = req.body;
        const userId = req.user._id;

        if (!image || !text) {
            return res.status(status.BAD_REQUEST).json(new ApiError(status.BAD_REQUEST, AppString.ALL_FIELDS_REQUIRED))
        }

        const conversationExist = await messageService.createMessage(userId, text, image);

        return res.status(status.OK).json(new ApiResponse(status.OK, conversationExist, AppString.MESSAGE_SENT))

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
});

const getMessages = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { chatId } = req.params;
        const conversationExist = await messageService.getMessage(chatId);

        return res.status(status.OK).json(new ApiResponse(status.OK, conversationExist, AppString.MESSAGE_SENT))

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
});

export default {
    createMessage,
    getMessages
}