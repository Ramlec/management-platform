import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserMembershipEntity } from "./entities/user-membership.entity";
import { UsersService } from "src/users/users.service";
import { MembershipsService } from "src/memberships/memberships.service";
import { UserEntity } from "src/users/entities/user.entity";
import { MembershipEntity } from "src/memberships/entities/membership.entity";
import { reorganizeRolesForMembership } from "./user-memberships.helpers";

@Injectable()
export class UserMembershipsService {
    constructor(
        @InjectRepository(UserMembershipEntity)
        private readonly userMembershipRepo: Repository<UserMembershipEntity>,
        private readonly usersService: UsersService,
        private readonly membershipsService: MembershipsService,
    ) { }

    /**
     * List all associations between users and memberships, optionally filtered.
     * @param filter - Optional filters for search.
     * @returns Array of associations between users and memberships.
    */
    async listUserMemberships(): Promise<UserMembershipEntity[]> {
        return this.userMembershipRepo.find();
    }

    /**
     * Retrieve an association between a user and a membership by its id.
     * @param id - The id of the association between a user and a membership.
     * @returns The corresponding association between a user and a membership, or undefined if not found.
     */
    async getUserMembership(id: number): Promise<UserMembershipEntity> {
        const userMembership = await this.userMembershipRepo.findOne({ where: { id } });
        if (!userMembership) {
            throw new NotFoundException(`User membership not found`);
        }
        return userMembership;
    }

    /**
     * Create a new association between a user and a membership.
     * @param createUserMembershipDto - Data required for creation.
     * @returns The created association between a user and a membership.
     */
    async createUserMembership(userMembership: UserMembershipEntity): Promise<UserMembershipEntity> {
        const promises = [
            this.usersService.getUser(userMembership.userId),
            this.membershipsService.getMembership(userMembership.membershipId),
        ];
        const [user, membership] = await Promise.all(promises) as [UserEntity, MembershipEntity];
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        if (!membership) {
            throw new NotFoundException(`Membership not found`);
        }

        const existingAssociation = await this.userMembershipRepo.findOne({
            where: {
                userId: userMembership.userId,
                membershipId: userMembership.membershipId,
            },
        });

        if (existingAssociation) {
            throw new ConflictException(
                `User ${userMembership.userId} is already associated with membership ${userMembership.membershipId}`
            );
        }
        const savedUserMembership = await this.userMembershipRepo.save(userMembership);

        const updatedRoles = reorganizeRolesForMembership(user.roles);
        await this.usersService.patchUser(user.id, { roles: updatedRoles });

        return savedUserMembership;
    }

    /**
     * Fully update an association between a user and a membership by its id.
     * @param id - The id of the association between a user and a membership to update.
     * @param updateUserMembershipDto - New data for the association between a user and a membership.
     * @returns The updated association between a user and a membership.
     * @status 400 BAD REQUEST if the user membership does not exist.
     */
    async updateUserMembership(id: number, userMembershipDto: Partial<UserMembershipEntity>): Promise<UserMembershipEntity> {
        userMembershipDto.id = id;
        const existingUserMembership = await this.userMembershipRepo.findOne({ where: { id } });
        if (!existingUserMembership) {
            throw new NotFoundException(`User membership not found`);
        }
        this.userMembershipRepo.merge(existingUserMembership, userMembershipDto);

        return this.userMembershipRepo.save(existingUserMembership);
    }

    /**
     * Partially update an association between a user and a membership by its id.
     * @param id - The id of the UserMembership to partially update.
     * @param patchUserMembershipDto - Data to update.
     * @returns The updated association between a user and a membership.
     * @status 400 BAD REQUEST if the user membership does not exist.
     */
    async patchUserMembership(id: number, patchUserMembershipDto: Partial<UserMembershipEntity>): Promise<UserMembershipEntity> {
        const existingUserMembership = await this.userMembershipRepo.findOne({ where: { id } });
        if (!existingUserMembership) {
            throw new NotFoundException(`User membership not found`);
        }
        this.userMembershipRepo.merge(existingUserMembership, patchUserMembershipDto);

        return this.userMembershipRepo.save(existingUserMembership);
    }
}

