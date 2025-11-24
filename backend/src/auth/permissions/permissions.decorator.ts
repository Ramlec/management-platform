import { SetMetadata } from "@nestjs/common";

import { Permission } from "./permissions.enum";

export const PERMISSIONS_KEY = `permissions`;

/**
 * Decorator to require specific permissions for a route or controller.
 * @param permissions - The permissions to require.
 * @returns A decorator function that sets the permissions metadata.
 */
export const RequirePermissions = (...permissions: Permission[]) =>
    SetMetadata(PERMISSIONS_KEY, permissions);
