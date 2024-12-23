import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import status from 'http-status'
import { AppString } from "../utils/appString";

const bookProperty = asyncHandler(async (req: Request, res: Response) => {
    try {

        return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.MESSAGE_SENT))

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
});

const getProperty = asyncHandler(async (req: Request, res: Response) => {
    try {


        return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.MESSAGE_SENT))

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
});

export default {
    bookProperty,
    getProperty
}