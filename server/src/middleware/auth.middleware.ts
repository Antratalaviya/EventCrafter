import status from "http-status";
import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/customUtilities";
import { AppString } from "../utils/appString";
import { UserTokenPayload } from "../constants";
import userService from "../service/user.service";

const verifyUserAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let token =
    req.cookies?.accessToken ||
    req.headers?.authorization?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(status.UNAUTHORIZED)
      .json(new ApiError(status.UNAUTHORIZED, AppString.UNAUTHORIZED));
  }
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    { complete: true }, async (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(status.UNAUTHORIZED).json(new ApiError(status.UNAUTHORIZED, AppString.TOKEN_EXPIRE));
        } else {
          return res.status(status.UNAUTHORIZED).json(new ApiError(status.UNAUTHORIZED, AppString.UNAUTHORIZED));
        }
      }

      const payload = decoded?.payload as UserTokenPayload;
      const user = await userService.getUserById(payload._id);
      req.user = user;
      next();
    }
  );
};

export default { verifyUserAccess };
