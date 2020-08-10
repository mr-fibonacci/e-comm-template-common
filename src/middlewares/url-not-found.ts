import { ResourceNotFoundError } from '../errors/resource-not-found-error';

export const urlNotFound = (): void => {
  throw new ResourceNotFoundError('url');
};
