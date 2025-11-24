import { UserRoles } from "src/auth/roles/roles.enum";

/**
 * Manage the roles of the user for the membership.
 * Add the role member if it is not already present.
 * @param currentRoles - The current roles of the user.
 * @returns The roles of the user after the membership is created.
 */
export function manageRolesForMembership(currentRoles: UserRoles[]): UserRoles[] {

    if (!currentRoles.includes(UserRoles.MEMBER)) {
        currentRoles.push(UserRoles.MEMBER);
    }

    return currentRoles;
}
