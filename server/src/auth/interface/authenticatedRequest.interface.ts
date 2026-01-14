import { Request } from 'express';
import { UserPayload } from './user.interface';

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
  cookies: {
    access_token?: string;
    [key: string]: string | undefined;
  };
}
