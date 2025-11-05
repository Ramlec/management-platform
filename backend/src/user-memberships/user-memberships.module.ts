import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMembershipsController } from './user-memberships.controller';
import { UserMembershipsService } from './user-memberships.service';
import { UserMembershipEntity } from './entities/user-membership.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserMembershipEntity])],
    controllers: [UserMembershipsController],
    providers: [UserMembershipsService],
    exports: [UserMembershipsService],
})
export class UserMembershipsModule { }

