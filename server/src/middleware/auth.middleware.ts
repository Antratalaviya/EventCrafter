import status from "http-status";
import jwt, { Jwt } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/customUtilities";
import { AppString } from "../utils/appString";
import { UserDocument, UserTokenPayload } from "../constants";
import userService from "../service/user.service";

const verifyUserAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    let token =
      req.cookies?.accessToken ||
      req.headers?.authorization?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(status.UNAUTHORIZED)
        .json(new ApiError(status.UNAUTHORIZED, AppString.UNAUTHORIZED));
    }
    const decoded = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET as string)
    const payload = decoded as UserTokenPayload;
    const user = await userService.getUserById(payload._id);
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};

const verifyToken = async (token: string, secret: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secret,
      { complete: true }, async (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return reject(new ApiError(status.UNAUTHORIZED, AppString.TOKEN_EXPIRE));
          } else {
            return reject(new ApiError(status.UNAUTHORIZED, AppString.UNAUTHORIZED));
          }
        }
        else {
          resolve(decoded?.payload)
        }
      }
    );
  })
}

const getUserFromToken = async (token: string): Promise<UserDocument> => {
  return new Promise(async (resolve, reject) => {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      { complete: true },
      async (err, decoded) => {
        if (err) {
          return reject(err); // Handle error
        }

        const payload = decoded?.payload as UserTokenPayload;

        if (!payload?._id) {
          return reject(new Error('Invalid token payload')); // Handle missing ID
        }

        try {
          const user = await userService.getUserById(payload._id);
          resolve(user!); // Resolve with the user
        } catch (error) {
          reject(error); // Handle user retrieval error
        }
      }
    );
  });
};
export { getUserFromToken }
export default { verifyUserAccess };
