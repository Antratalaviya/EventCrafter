import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import { Request, Response } from 'express';
import status from 'http-status';
import avatarService from "../service/avatar.service";
import { AppString } from "../utils/appString";
import { redisClient } from "../dbConnection/redisConfig";

const getAllAvatar = asyncHandler(async (req: Request, res: Response) => {
    try {
        const avatars = await avatarService.getAllAvatar();

        if (!avatars || avatars.length === 0) {
            return res.status(status.OK)
                .json(
                    new ApiResponse(status.OK, [], AppString.AVATAR_RETRIEVED)
                );
        }

        await redisClient.set("avatar", JSON.stringify(avatars));

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, avatars, AppString.AVATAR_RETRIEVED)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const createAvatar = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        const avatar = await avatarService.createAvatar(url);

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, avatar, AppString.AVATAR_CREATED)
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
    getAllAvatar,
    createAvatar
}