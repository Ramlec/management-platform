import { UserRoles } from "src/auth/roles/roles.enum";

/**
 * Reorganize the roles of the user for the membership.
 * Remove the roles that are not relevant for the membership and add the ACTIVE_MEMBER role if it is not already present.
 * @param currentRoles - The current roles of the user.
 * @returns The roles of the user after the membership is created.
 */
export function reorganizeRolesForMembership(currentRoles: UserRoles[]): UserRoles[] {
    const rolesToRemove = [
        UserRoles.USER,
        UserRoles.GUEST,
        UserRoles.MEMBER,
    ];

    const privilegedRoles = currentRoles.filter(role => !rolesToRemove.includes(role));

    if (!privilegedRoles.includes(UserRoles.ACTIVE_MEMBER)) {
        privilegedRoles.push(UserRoles.ACTIVE_MEMBER);
    }

    return privilegedRoles;
}