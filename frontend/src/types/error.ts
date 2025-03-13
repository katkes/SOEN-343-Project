import { StatusCodes } from "http-status-codes";

export class NetworkError extends Error {
  errorCode: StatusCodes;

  constructor(errorCode: StatusCodes){
    super()
    this.errorCode = errorCode
  }
}