import { CurrentUser } from './custom-types/custom-types';

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

export {};
