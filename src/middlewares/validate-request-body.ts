import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { RequestBodyError } from '../errors/request-body-error';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validateRequestBody = (chainArr: ValidationChain[]) => {
  return [
    chainArr,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new RequestBodyError(errors.array());
      }
      next();
    },
  ];
};
