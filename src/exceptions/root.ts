export class HTTPException extends Error {
  messages;
  errorCode;
  statusCode;
  error;

  constructor(
    message: string,
    errorCode: ErrorCodes,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.messages = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.error = error;
  }
}

export enum ErrorCodes {
  USER_NOT_FOUND = 1000,
  USER_ALREADY_EXISTS = 1001,
  INVALID_PASSWORD = 1002,
}
