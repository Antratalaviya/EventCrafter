import { NextFunction, Request, Response } from "express";

export class ApiResponse {
  success: boolean;

  constructor(
    public statusCode: number,
    public data: object,
    public message: string
  ) {
    this.success = statusCode < 400;
  }
}

export class ApiError {
  data: null;
  success: boolean;

  constructor(
    public statusCode: number,
    public message = "something went wrong"
  ) {
    this.data = null;
    this.success = false;
  }
}

export const asyncHandler =
  (requestHandler: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
