import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserMembershipsModule } from "src/user-memberships/user-memberships.module";

import { UserEntity } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    controllers: [UsersController],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => UserMembershipsModule)],
    providers: [UsersService],
})
export class UsersModule {}
