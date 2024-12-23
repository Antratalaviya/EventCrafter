import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import status from 'http-status'
import { AppString } from "../utils/appString";
import { PropertyInput } from "../constants";
import propertyService from "../service/property.service";

const createProperty = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const property: PropertyInput = req.body;

        let newproperty = await propertyService.createProperty(user._id, property);
        if (!newproperty) {
            return res.status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.PROPERTY_CREATION_FAILED)
                );
        }
        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.PROPERTY_CREATED)
            );

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
});

const getProperties = asyncHandler(async (req: Request, res: Response) => {
    try {
        let page: number =
            typeof req.query?.page === "string"
            && parseInt(req.query?.page) || 1;
        let limit: number =
            typeof req.query?.limit === "string"
            && parseInt(req.query?.limit) || 10;

        let keyword = typeof req.query?.keyword === "string"
            && req.query?.keyword || "";

        let rating = typeof req.query?.rating === "string"
            && req.query?.rating || "";
        let amenities = typeof req.query?.amenities === "string"
            && req.query?.amenities || "";
        let sortby = typeof req.query?.sortby === "string"
            && req.query?.sortby || "";

        const properties = await propertyService.getAllProperty(page, limit, keyword, rating, amenities, sortby);

        return res.status(status.OK).json(new ApiResponse(status.OK, properties, AppString.MESSAGE_SENT))

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
});

const getOwnProperty = asyncHandler(async (req: Request, res: Response) => {
    try {
        const properties = await propertyService.getOwnProperty(req.user._id);
        if (!properties) {
            return res.status(status.OK).json(new ApiResponse(status.OK, [], AppString.MESSAGE_SENT))
        }
        return res.status(status.OK).json(new ApiResponse(status.OK, properties, AppString.MESSAGE_SENT))

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
});

export default {
    createProperty,
    getProperties,
    getOwnProperty
}