import { Role } from 'common-app/models';

export interface User {
  _id: string;
  email: string;
  password: string;
  salt: string;
  role: Role;
}
