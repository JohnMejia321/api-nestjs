import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredTypes = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!requiredTypes) {
      return true; // No permissions required
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assume user is attached by auth guard
    if (!user || !user.role || !user.role.modules) {
      return false;
    }
    // Flatten all permissions from modules and links
    const userPermissions: any[] = [];
    user.role.modules.forEach(module => {
      if (module.permissions) {
        userPermissions.push(...module.permissions);
      }
      if (module.links) {
        module.links.forEach(link => {
          if (link.permissions) {
            userPermissions.push(...link.permissions);
          }
          if (link.toolbar) {
            userPermissions.push(...link.toolbar);
          }
        });
      }
    });
    // Check if user has all required types (using value or type)
    return requiredTypes.every(requiredType =>
      userPermissions.some(perm => perm.type === requiredType || perm.value === requiredType)
    );
  }
}