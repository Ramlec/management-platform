import { UserRoles } from "../roles/roles.enum";
import { Permission } from "./permissions.enum";

export const ROLE_PERMISSIONS: Record<UserRoles, Permission[]> = {
    [UserRoles.ACTIVE_MEMBER]: [
        Permission.USER_READ,
        Permission.MEMBERSHIP_READ,
        Permission.USER_MEMBERSHIP_READ,
    ],

    [UserRoles.ADMIN]: [
        Permission.ADMIN_ALL, // Wildcard pour tout
    ],

    [UserRoles.BARISTA]: [Permission.USER_READ, Permission.USER_MEMBERSHIP_READ],

    [UserRoles.BOARD]: [
        Permission.USER_READ,
        Permission.USER_WRITE,
        Permission.USER_UPDATE_ROLES,
        Permission.MEMBERSHIP_READ,
        Permission.MEMBERSHIP_WRITE,
        Permission.USER_MEMBERSHIP_READ,
        Permission.USER_MEMBERSHIP_WRITE,
        Permission.USER_MEMBERSHIP_VALIDATE,
    ],

    [UserRoles.COMMITEE]: [
        Permission.USER_READ,
        Permission.USER_WRITE,
        Permission.MEMBERSHIP_READ,
        Permission.MEMBERSHIP_WRITE,
        Permission.USER_MEMBERSHIP_READ,
        Permission.USER_MEMBERSHIP_WRITE,
    ],

    [UserRoles.GUEST]: [
        // No permissions
    ],

    [UserRoles.MEMBER]: [
        Permission.USER_READ, // Can see their own profile
    ],

    [UserRoles.REFERANT]: [
        Permission.USER_READ,
        Permission.USER_MEMBERSHIP_READ,
        Permission.USER_MEMBERSHIP_VALIDATE,
    ],

    [UserRoles.SERVICES_BOARD]: [
        Permission.USER_READ,
        Permission.USER_WRITE,
        Permission.USER_UPDATE_ROLES, // Can change the roles referent/barista
        Permission.USER_MEMBERSHIP_READ,
    ],

    [UserRoles.USER]: [
        // No permissions
    ],
};
