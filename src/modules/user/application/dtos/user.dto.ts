import { UserStatus } from '@prisma/client';

export interface UserDto {
  id: string;
  username: string;

  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  fullName: string;
  middleName: string;

  roles: string[];
  permissions: string[];

  status: UserStatus;
  phoneNumber: string;
  address: string;
  qrUrl: string;
  avatarUrl: string;

  createdAt: Date;
  updatedAt: Date;
  updatedById: string;
}
