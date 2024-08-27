import status from "http-status";

import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import { UserInput } from "../constants";
import userService from "../service/user.service";
import { AppString, NotificationMsg } from "../utils/appString";
import eventEmitter from "../utils/event";
import otpService from "../service/otp.service";
import notificationService from "../service/notification.service";

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
    await notificationService.createNotification({
      type: "register",
      message: NotificationMsg.USER_REGISTERED,
      sender: user._id,
      recipient: user._id,
    })

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

    let passValid = await user.isPasswordMatched(credential.password);

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
    await notificationService.createNotification({
      type: "login",
      message: NotificationMsg.USER_LOGIN,
      sender: user._id,
      recipient: user._id,
    })
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
    console.log(error)

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

const sendOtp = asyncHandler(async (req: Request, res: Response) => {
  try {
    let user = req.user;

    let otpExist = await otpService.getOtp(user.email);

    let otp = await otpService.generateOtp();

    if (otpExist) {
      await otpService.deleteOtp(user.email);
    }

    let newOtpSchema = await otpService.createOtp(user.email, otp);

    if (!newOtpSchema) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(new ApiError(status.INTERNAL_SERVER_ERROR, AppString.OTP_ERR));
    }

    let to = user.email;
    let subject = "Verify your email";
    let text = "Your email verified Succesfully";

    console.log(otp)

    // await sendMail(to, text, otp, subject);

    return res
      .status(status.OK)
      .json(new ApiResponse(status.OK, {}, AppString.OTP_SEND));
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(
        new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
      );
  }
});

const sendMail = async (
  to: string,
  text: string,
  otp: number,
  subject: string
) => {
  try {
    await eventEmitter.emit("send_otp_with_mail", {
      to: to,
      subject: subject,
      text: text,
      otp: otp,
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  try {
    let otp = req.body.otp;
    let user = req.user;

    let otpExist = await otpService.getOtp(user.email);

    if (!otpExist) {
      return res
        .status(status.NOT_FOUND)
        .json(new ApiError(status.NOT_FOUND, AppString.OTP_EXPIRED));
    }

    console.log(typeof otp);
    console.log(typeof otpExist.otp.toString())

    if (otp !== otpExist.otp.toString()) {
      return res
        .status(status.BAD_REQUEST)
        .json(new ApiError(status.BAD_REQUEST, AppString.OTP_NOT_MATCH));
    }

    return res
      .status(status.OK)
      .json(new ApiResponse(status.OK, {}, AppString.OTP_VERIFY));
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
  sendOtp,
  verifyOtp,
};
