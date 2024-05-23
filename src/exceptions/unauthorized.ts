import { ErrorCodes, HTTPException } from "./HTTPException";

export class Unauthorized extends HTTPException {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, errorCode, 401, null);
  }
}
