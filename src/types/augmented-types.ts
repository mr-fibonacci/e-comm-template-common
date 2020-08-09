import { CurrentUser } from './custom-types';

// global for cookie: { jwt } and req.currentUser for /api/users/currentuser
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace CookieSessionInterfaces {
    interface CookieSessionRequest {
      currentUser: CurrentUser;
    }
    interface CookieSessionObject {
      jwt: string;
    }
  }
}

// ownsResource middleware
declare module 'mongoose' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  interface Document {
    userId?: string;
  }
}

export {};
