import jwt from 'jsonwebtoken';
import { CurrentUser } from '../types/custom-types';

// create a token, build a session object, stringify it, convert it to base64 and return as a string in an array
export const jwtCookie = (userPayload: CurrentUser): string[] => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const token = jwt.sign(userPayload, process.env.JWT_KEY!);
  const sessionObj = { jwt: token };
  const sessionJSON = JSON.stringify(sessionObj);
  const base64 = Buffer.from(sessionJSON).toString('base64');
  return [`express:sess=${base64}`];
};

export const expiredCookie = [
  'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
];
