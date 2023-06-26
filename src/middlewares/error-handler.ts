import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../shared/errors/custom-error";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.error(err);
  return res.status(500).send({ errors: [{ message: "Error interno." }] });
};
