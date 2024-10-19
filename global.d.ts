import { RequestUser } from '@modules/auth';

declare global {
  type AnyObject = Record<string, unknown>;

  namespace Express {
    interface Request {
      id: string;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends RequestUser {}
  }
}
