import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserMembershipEntity } from "src/user-memberships/entities/user-membership.entity";

import { MembershipEntity } from "./entities/membership.entity";
import { MembershipsController } from "./memberships.controller";
import { MembershipsService } from "./memberships.service";

@Module({
    controllers: [MembershipsController],
    exports: [MembershipsService],
    imports: [TypeOrmModule.forFeature([MembershipEntity, UserMembershipEntity])],
    providers: [MembershipsService],
})
export class MembershipsModule {}
