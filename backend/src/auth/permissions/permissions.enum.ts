export enum Permission {
    // Admin wildcard permission
    ADMIN_ALL = `admin:*`,
    MEMBERSHIP_DELETE = `membership:delete`,
    // Membership related permissions
    MEMBERSHIP_READ = `membership:read`,
    MEMBERSHIP_WRITE = `membership:write`,

    USER_DELETE = `user:delete`,
    USER_MEMBERSHIP_DELETE = `user-membership:delete`,
    // UserMembership related permissions
    USER_MEMBERSHIP_READ = `user-membership:read`,

    USER_MEMBERSHIP_VALIDATE = `user-membership:validate`,
    USER_MEMBERSHIP_WRITE = `user-membership:write`,
    // User related permissions
    USER_READ = `user:read`,
    USER_UPDATE_ROLES = `user:update:roles`,

    USER_WRITE = `user:write`,
}
