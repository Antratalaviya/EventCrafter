// import { NextFunction, Request, Response } from "express";
// import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
// import status from 'http-status';
// import { AppString } from "../utils/appString";
// import { redisClient } from "../dbConnection/redisConfig";

// const ownEvents = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let page: number =
//             typeof req.query?.page === "string"
//             && parseInt(req.query?.page) || 1;
//         let limit: number =
//             typeof req.query?.limit === "string"
//             && parseInt(req.query?.limit) || 10;

//         let keyword = typeof req.query?.keyword === "string"
//             && req.query?.keyword || "";
//         let eventStatus = typeof req.query?.status === "string"
//             && req.query?.status || "";

//         let eventType = typeof req.query?.type === "string"
//             && req.query?.type || "";
//         let sortby = typeof req.query?.sortby === "string"
//             && req.query?.sortby || "";

//         const events = await redisClient.get(`ownEvents?page=${page}&limit=${limit}&keyword=${keyword}&status=${eventStatus}&type=${eventType}&sortby=${sortby}`);

//         if (events) {
//             return res.status(status.OK)
//                 .json(
//                     new ApiResponse(status.OK, JSON.parse(events), AppString.EVENT_RETRIEVED)
//                 );
//         }
//         next();
//     } catch (error) {
//         return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED));
//     }
// })

// const allEvents = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let page: number =
//             typeof req.query?.page === "string"
//             && parseInt(req.query?.page) || 1;
//         let limit: number =
//             typeof req.query?.limit === "string"
//             && parseInt(req.query?.limit) || 10;

//         let keyword = typeof req.query?.keyword === "string"
//             && req.query?.keyword || "";

//         let eventType = typeof req.query?.type === "string"
//             && req.query?.type || "";
//         let sortby = typeof req.query?.sortby === "string"
//             && req.query?.sortby || "";

//         const events = await redisClient.get(`allEvents?page=${page}&limit=${limit}&keyword=${keyword}&type=${eventType}&sortby=${sortby}`);

//         if (events) {
//             return res.status(status.OK)
//                 .json(
//                     new ApiResponse(status.OK, JSON.parse(events), AppString.EVENT_RETRIEVED)
//                 );
//         }
//         next();
//     } catch (error) {
//         return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED));
//     }
// })

// const userProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await redisClient.get("user");

//         if (user) {
//             return res.status(status.OK)
//                 .json(
//                     new ApiResponse(status.OK, JSON.parse(user), AppString.USER_RETRIEVED)
//                 );
//         }
//         next();
//     } catch (error) {
//         return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED));
//     }
// })

// const avatar = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const avatar = await redisClient.get("avatar");

//         if (avatar) {
//             return res.status(status.OK)
//                 .json(
//                     new ApiResponse(status.OK, JSON.parse(avatar), AppString.AVATAR_RETRIEVED)
//                 );
//         }
//         next();
//     } catch (error) {
//         return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED));
//     }
// })

// export default {
//     ownEvents,
//     allEvents,
//     userProfile,
//     avatar
// };