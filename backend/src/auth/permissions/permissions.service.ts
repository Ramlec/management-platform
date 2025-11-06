import { Injectable } from "@nestjs/common";
import { UserRoles } from "../roles/roles.enum";
import { Permission } from "./permissions.enum";
import { ROLE_PERMISSIONS } from "./permissions.constant";

@Injectable()
export class PermissionsService {
    /**
     * Check if a role has a specific permission
     * @param role - The role to check.
     * @param permission - The permission to check.
     * @returns True if the role has the permission, false otherwise.
     */
    hasPermission(role: UserRoles, permission: Permission): boolean {
        const rolePermissions = ROLE_PERMISSIONS[role] || [];

        // Check if the role has the admin all permission
        if (rolePermissions.includes(Permission.ADMIN_ALL)) {
            return true;
        }

        return rolePermissions.includes(permission);
    }

    /**
     * Check if a user has any of the required permissions
     * @param userRoles - The roles of the user.
     * @param permission - The permission to check.
     * @returns True if the user has any of the required permissions, false otherwise.
     */
    hasAnyPermission(userRoles: UserRoles[], permission: Permission): boolean {
        return userRoles.some((role) => this.hasPermission(role, permission));
    }

    /**
     * Check if a user has all the required permissions
     * @param userRoles - The roles of the user.
     * @param permissions - The permissions to check.
     * @returns True if the user has all the required permissions, false otherwise.
     */
    hasAllPermissions(userRoles: UserRoles[], permissions: Permission[]): boolean {
        return permissions.every((permission) =>
            this.hasAnyPermission(userRoles, permission)
        );
    }

    /**
     * Get all permissions for a role
     * @param role - The role to get the permissions for.
     * @returns All permissions for the role.
     */
    getPermissionsForRole(role: UserRoles): Permission[] {
        return ROLE_PERMISSIONS[role] || [];
    }

    /**
     * Get all permissions for a user (all their roles combined)
     * @param userRoles - The roles of the user.
     * @returns All permissions for the user.
     */
    getPermissionsForUser(userRoles: UserRoles[]): Permission[] {
        const allPermissions = new Set<Permission>();

        userRoles.forEach((role) => {
            const rolePermissions = this.getPermissionsForRole(role);
            rolePermissions.forEach((perm) => allPermissions.add(perm));
        });

        return Array.from(allPermissions);
    }
}

