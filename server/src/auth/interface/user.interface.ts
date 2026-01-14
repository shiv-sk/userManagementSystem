import { UserRoles } from 'commons/user.roles';

export interface User {
  name: string;
  email: string;
  id: string;
  role: UserRoles[];
}

export interface UserPayload {
  sub: string;
  email: string;
  role: UserRoles[];
}
