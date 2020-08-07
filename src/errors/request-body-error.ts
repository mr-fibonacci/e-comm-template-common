import { CustomError, ErrorMessageObject } from './custom-error';
import { ValidationError } from 'express-validator';

export class RequestBodyError extends CustomError {
  constructor(public errors: ValidationError[]) {
    super('will be overwritten by express validator');
    Object.setPrototypeOf(this, RequestBodyError.prototype);
  }
  statusCode = 422;
  mapErrors(): ErrorMessageObject {
    return {
      errors: this.errors.map((error) => ({
        message: error.msg,
        field: error.param,
      })),
    };
  }
}
