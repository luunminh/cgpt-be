import { UserType } from '@prisma/client';
import { SystemRole } from './role.constant';

const MapRoleByUserType = {
  [UserType.ADMIN]: SystemRole.ADMIN,
  [UserType.USER]: SystemRole.USER,
};

export { MapRoleByUserType };
