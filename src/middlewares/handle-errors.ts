import { Request, Response, NextFunction } from 'express';
import { CustomError, ErrorMessageObject } from '../errors/custom-error';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.mapErrors());
  }
  console.error(err);
  res.send({
    errors: [{ message: 'server did an oopsie!' }],
  } as ErrorMessageObject);
};
