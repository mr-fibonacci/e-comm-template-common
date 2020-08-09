import { Request, Response, NextFunction } from 'express';

import { Model, Document } from 'mongoose';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ownsResource = (resourceModel: Model<Document>) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const resource = await resourceModel.findById(req.params.id);
  if (!resource) {
    throw new ResourceNotFoundError(resourceModel.modelName);
  }
  if (resource.userId === req.currentUser.id) {
    return next();
  }
  throw new NotAuthorizedError();
};
