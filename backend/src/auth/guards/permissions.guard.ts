import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { PERMISSIONS_KEY } from "../permissions/permissions.decorator";
import { Permission } from "../permissions/permissions.enum";
import { PermissionsService } from "../permissions/permissions.service";
import { UserRoles } from "../roles/roles.enum";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private permissionsService: PermissionsService,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
            PERMISSIONS_KEY,
            [context.getHandler(), context.getClass()],
        );

        // If no permissions are required, allow access
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }

        // TODO: Get the user from the request (once the auth is implemented)
        // For now, we assume that the user is in request.user
        const request: { user: { roles: undefined | UserRoles[] } | undefined } =
            context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.roles) {
            throw new ForbiddenException(`User not authenticated`);
        }

        const userRoles: UserRoles[] = user.roles;
        const hasPermission = this.permissionsService.hasAllPermissions(
            userRoles,
            requiredPermissions,
        );

        if (!hasPermission) {
            throw new ForbiddenException(
                `Insufficient permissions. Required: ${requiredPermissions.join(`, `)}`,
            );
        }

        return true;
    }
}
