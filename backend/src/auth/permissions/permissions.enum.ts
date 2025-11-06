export enum Permission {
    // User related permissions
    USER_READ = `user:read`,
    USER_WRITE = `user:write`,
    USER_DELETE = `user:delete`,
    USER_UPDATE_ROLES = `user:update:roles`,

    // Membership related permissions
    MEMBERSHIP_READ = `membership:read`,
    MEMBERSHIP_WRITE = `membership:write`,
    MEMBERSHIP_DELETE = `membership:delete`,

    // UserMembership related permissions
    USER_MEMBERSHIP_READ = `user-membership:read`,
    USER_MEMBERSHIP_WRITE = `user-membership:write`,
    USER_MEMBERSHIP_DELETE = `user-membership:delete`,
    USER_MEMBERSHIP_VALIDATE = `user-membership:validate`,

    // Admin wildcard permission
    ADMIN_ALL = `admin:*`,
}

