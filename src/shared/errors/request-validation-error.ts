import { type ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public readonly errors: ValidationError[]) {
    super();
  }

  serializeErrors(): Array<{ message: string; field?: string }> {
    return this.errors.map((err) => {
      if (err.type === "field") {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
