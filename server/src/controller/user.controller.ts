import { Request, Response } from "express";
import status from 'http-status'
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import { AppString } from "../utils/appString";


const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.user;
        return res.status(status.OK).json(new ApiResponse(status.OK, {
            email: user.email,
            name: user.name,
            surname: user.surname,
            profileImg: user.profileImg
        }, AppString.USER_RETRIEVED));
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})


export default {
    getUserProfile
}