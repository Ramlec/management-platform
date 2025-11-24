import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MembershipEntity } from "src/memberships/entities/membership.entity";
import { MembershipsService } from "src/memberships/memberships.service";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";

import { UserMembershipEntity } from "./entities/user-membership.entity";
import { reorganizeRolesForMembership } from "./user-memberships.helpers";

@Injectable()
export class UserMembershipsService {
    constructor(
        @InjectRepository(UserMembershipEntity)
        private readonly userMembershipRepo: Repository<UserMembershipEntity>,
        private readonly usersService: UsersService,
        private readonly membershipsService: MembershipsService,
    ) {}

    /**
     * Create a new association between a user and a membership.
     * @param createUserMembershipDto - Data required for creation.
     * @returns The created association between a user and a membership.
     */
    async createUserMembership(
        userMembership: UserMembershipEntity,
    ): Promise<UserMembershipEntity> {
        const promises = [
            this.usersService.getUser(userMembership.userId),
            this.membershipsService.getMembership(userMembership.membershipId),
        ];
        const [user, membership] = (await Promise.all(promises)) as [UserEntity, MembershipEntity];
        const existingAssociation = await this.userMembershipRepo.findOne({
            where: {
                membershipId: membership.id,
                userId: user.id,
            },
        });
        if (existingAssociation) {
            throw new ConflictException(
                `User ${userMembership.userId} is already associated with membership ${userMembership.membershipId}`,
            );
        }
        const savedUserMembership = await this.userMembershipRepo.save(userMembership);
        const updatedRoles = reorganizeRolesForMembership(user.roles);
        await this.usersService.patchUser(user.id, { roles: updatedRoles });
        return savedUserMembership;
    }

    /**
     * Get the active membership for a specific user (based on current date).
     * @param userId - The id of the user.
     * @returns The active user membership, or null if no active membership found.
     */
    async getActiveMembership(userId: number): Promise<null | UserMembershipEntity> {
        await this.usersService.getUser(userId);

        const now = new Date();
        const userMembership = await this.userMembershipRepo.findOne({
            order: { createdAt: "DESC" },
            relations: [`membership`],
            where: {
                membership: {
                    endAt: MoreThanOrEqual(now),
                    startAt: LessThanOrEqual(now),
                },
                userId,
            },
        });

        return userMembership;
    }

    /**
     * Retrieve an association between a user and a membership by its id.
     * @param id - The id of the association between a user and a membership.
     * @returns The corresponding association between a user and a membership, or undefined if not found.
     */
    async getUserMembership(id: number): Promise<UserMembershipEntity> {
        const userMembership = await this.userMembershipRepo.findOne({
            where: { id },
        });
        if (!userMembership) {
            throw new NotFoundException(`User membership not found`);
        }
        return userMembership;
    }

    /**
     * Get a specific user membership by userId and membershipId.
     * @param userId - The id of the user.
     * @param membershipId - The id of the membership.
     * @returns The user membership.
     */
    async getUserMembershipByUserAndMembership(
        userId: number,
        membershipId: number,
    ): Promise<UserMembershipEntity> {
        const userMembership = await this.userMembershipRepo.findOne({
            relations: [`membership`, `user`],
            where: { membershipId, userId },
        });

        if (!userMembership) {
            throw new NotFoundException(
                `User membership not found for user ${userId} and membership ${membershipId}`,
            );
        }

        return userMembership;
    }

    /**
     * List all memberships for a specific user.
     * @param userId - The id of the user.
     * @returns Array of user memberships for this user.
     */
    async getUserMemberships(userId: number): Promise<UserMembershipEntity[]> {
        // Verify that user exists
        await this.usersService.getUser(userId);

        return this.userMembershipRepo.find({
            order: { createdAt: `DESC` },
            relations: [`membership`],
            where: { userId },
        });
    }

    /**
     * List all associations between users and memberships, optionally filtered.
     * @param filter - Optional filters for search.
     * @returns Array of associations between users and memberships.
     */
    async listUserMemberships(): Promise<UserMembershipEntity[]> {
        return this.userMembershipRepo.find();
    }

    /**
     * Partially update an association between a user and a membership by its id.
     * @param id - The id of the UserMembership to partially update.
     * @param patchUserMembershipDto - Data to update.
     * @returns The updated association between a user and a membership.
     * @status 400 BAD REQUEST if the user membership does not exist.
     */
    async patchUserMembership(
        id: number,
        patchUserMembershipDto: Partial<UserMembershipEntity>,
    ): Promise<UserMembershipEntity> {
        const existingUserMembership = await this.userMembershipRepo.findOne({
            where: { id },
        });
        if (!existingUserMembership) {
            throw new NotFoundException(`User membership not found`);
        }
        this.userMembershipRepo.merge(existingUserMembership, patchUserMembershipDto);

        return this.userMembershipRepo.save(existingUserMembership);
    }

    /**
     * Fully update an association between a user and a membership by its id.
     * If the user membership does not exist, it will be created.
     * @param id - The id of the association between a user and a membership to update.
     * @param userMembership - New data for the association between a user and a membership.
     * @returns The updated or created association between a user and a membership.
     */
    async updateUserMembership(
        id: number,
        userMembership: UserMembershipEntity,
    ): Promise<UserMembershipEntity> {
        userMembership.id = id;
        const existingUserMemberships = await this.userMembershipRepo.find({
            where: [
                { id },
                {
                    membershipId: userMembership.membershipId,
                    userId: userMembership.userId,
                },
            ],
        });
        if (existingUserMemberships.length > 1)
            throw new ConflictException(`Multiple user memberships found for id ${id}`);
        if (existingUserMemberships.length === 0) return this.createUserMembership(userMembership);

        const existingUserMembership = existingUserMemberships[0];
        this.userMembershipRepo.merge(existingUserMembership, userMembership);
        return this.userMembershipRepo.save(existingUserMembership);
    }
}
