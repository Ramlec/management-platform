import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserEntity } from "./entities/user.entity";
import { UserMembershipsModule } from "src/user-memberships/user-memberships.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => UserMembershipsModule),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }