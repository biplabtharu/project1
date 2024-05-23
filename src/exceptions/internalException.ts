import { ErrorCodes, HTTPException } from "./HTTPException";

export class InternalException extends HTTPException {
  constructor(message: string, errorCode: ErrorCodes, error: unknown) {
    super(message, errorCode, 500, error);
    this.message = message;
    this.errorCode = errorCode;
    this.error = error;
  }
}
