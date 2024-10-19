import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Identified } from '.';
import { PermissionGuard } from '../guards';

export const CAN_ACCESS_METADATA_KEY = 'permissions';

/**
 * CanAccessBy decorator
 * @param permissions
 * @returns
 */
export const CanAccessBy = (...permissions: string[]) => {
  return applyDecorators(
    SetMetadata(CAN_ACCESS_METADATA_KEY, permissions),
    Identified,
    UseGuards(PermissionGuard),
  );
};
