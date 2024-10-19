import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import { CAN_ACCESS_METADATA_KEY } from '../decorators';

export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<string[]>(
      CAN_ACCESS_METADATA_KEY,
      context.getHandler(),
    );
    if (!routePermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();

    const { user } = request;

    return routePermissions.some((permission) =>
      user.permissions.includes(permission),
    );
  }
}
