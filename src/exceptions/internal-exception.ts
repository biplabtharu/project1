import { ErrorCodes, HTTPException } from "./root";

export class internalException extends HTTPException {
  constructor(
    message: string,
    errorCode: ErrorCodes,
    statusCode: number,
    error: any
  ) {
    super(message, errorCode, statusCode, error);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.error = error;
  }
}
