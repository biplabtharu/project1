import { ErrorCodes, HTTPException } from "./HTTPException";

export class InvalidCredentials extends HTTPException {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, errorCode, 400, null);
  }
}
