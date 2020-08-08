import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { CurrentUser } from '../custom-types/custom-types';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.session?.jwt) {
    throw new NotAuthorizedError();
  }
  try {
    const { email, id } = jwt.verify(
      req.session?.jwt,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.JWT_KEY!
    ) as CurrentUser;
    req.currentUser = { email, id };
  } catch (err) {
    throw new NotAuthorizedError();
  }
  next();
};
