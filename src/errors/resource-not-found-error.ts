import { CustomError } from './custom-error';

export class ResourceNotFoundError extends CustomError {
  constructor(resource: string) {
    super(resource);
    this.message = `404, ${resource} not found`;
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }
  statusCode = 404;
}
