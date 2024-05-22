import { ErrorCodes, HTTPException } from "./root";

export class BadRequestException extends HTTPException {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, errorCode, 400, null);
    this.messages = message;
    this.errorCode = errorCode;
  }
}
