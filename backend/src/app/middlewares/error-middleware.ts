import { NextFunction, Request, Response } from "express";
import { ApiError } from "../@types/api/ApiError";
import { ApiResponseFactory } from "../@types/api/reponse.factory";
import { InternalError } from "../@types/errors/internal-error";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(ApiResponseFactory.error(err));
  }

  return res.status(500).json(
    ApiResponseFactory.error(
      new InternalError()
    )
  );
}
