import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserMembershipsController } from "./user-memberships.controller";
import { UserMembershipsService } from "./user-memberships.service";
import { UserMembershipEntity } from "./entities/user-membership.entity";
import { UsersModule } from "src/users/users.module";
import { MembershipsModule } from "src/memberships/memberships.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserMembershipEntity]),
        forwardRef(() => UsersModule),
        MembershipsModule,
    ],
    controllers: [UserMembershipsController],
    providers: [UserMembershipsService],
    exports: [UserMembershipsService],
})
export class UserMembershipsModule { }

