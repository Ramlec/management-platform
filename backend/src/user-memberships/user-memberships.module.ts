import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MembershipsModule } from "src/memberships/memberships.module";
import { UsersModule } from "src/users/users.module";

import { UserMembershipEntity } from "./entities/user-membership.entity";
import { UserMembershipsController } from "./user-memberships.controller";
import { UserMembershipsService } from "./user-memberships.service";

@Module({
    controllers: [UserMembershipsController],
    exports: [UserMembershipsService],
    imports: [
        TypeOrmModule.forFeature([UserMembershipEntity]),
        forwardRef(() => UsersModule),
        MembershipsModule,
    ],
    providers: [UserMembershipsService],
})
export class UserMembershipsModule {}
