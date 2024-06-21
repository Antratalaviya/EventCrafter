import status from "http-status";

import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import { UserDocument, UserInput } from "../constants";
import userService from "../service/user.service";
import { AppString } from "../utils/appString";

const register = asyncHandler(async (req: Request, res: Response) => {
  try {
    const body = req.body as UserInput;

    if (
      !(
        body.email ||
        body.name ||
        body.dob ||
        body.orgType ||
        body.password ||
        body.surname
      )
    ) {
      return res
        .status(status.BAD_REQUEST)
        .json(new ApiError(status.BAD_REQUEST, AppString.ALL_FIELDS_REQUIRED));
    }

    let userExist = await userService.getUserByEmail(body.email);

    if (userExist) {
      return res
        .status(status.UNAUTHORIZED)
        .json(new ApiError(status.UNAUTHORIZED, AppString.USER_EXIST));
    }

    let user = await userService.register(body);

    if (user) {
      return res
        .status(status.OK)
        .json(new ApiResponse(status.OK, {}, AppString.USER_REGISTERED));
    }
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(
        new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
      );
  }
});

const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const credential = req.body as UserInput;

    if (!(credential.email || credential.password)) {
      return res
        .status(status.BAD_REQUEST)
        .json(new ApiError(status.BAD_REQUEST, AppString.CREDENTIAL_REQUIRED));
    }

    let user = await userService.getUserByEmail(credential.email);

    if (!user) {
      return res
        .status(status.NOT_FOUND)
        .json(new ApiError(status.NOT_FOUND, AppString.USER_NOT_EXIST));
    }
    let passValid = user.isPasswordMatched(credential.password as string);

    if (!passValid) {
      return res
        .status(status.BAD_REQUEST)
        .json(new ApiError(status.BAD_REQUEST, AppString.PASSWORD_INCORRECT));
    }

    let accessToken = await user.generateAccessToken();
    let refreshToken = await user.generateRefreshToken();

    const option = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(status.OK)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", refreshToken, option)
      .json(
        new ApiResponse(
          status.OK,
          {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          AppString.USER_LOGIN
        )
      );
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(
        new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
      );
  }
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(status.NOT_FOUND)
        .json(new ApiError(status.NOT_FOUND, AppString.USER_NOT_EXIST));
    }

    await user.clearRefresh();

    const option = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(status.OK)
      .cookie("accessToken", "", option)
      .cookie("refreshToken", "", option)
      .json(new ApiResponse(status.OK, {}, AppString.USER_LOGOUT));
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(
        new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
      );
  }
});

export default {
  register,
  login,
  logout,
};
