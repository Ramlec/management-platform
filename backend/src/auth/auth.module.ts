import { Module } from "@nestjs/common";

import { PermissionsGuard } from "./guards/permissions.guard";
import { PermissionsService } from "./permissions/permissions.service";

@Module({
    exports: [PermissionsService, PermissionsGuard],
    providers: [PermissionsService, PermissionsGuard],
})
export class AuthModule {}
