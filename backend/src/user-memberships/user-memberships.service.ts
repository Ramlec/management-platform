import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMembershipEntity } from './entities/user-membership.entity';
import { CreateOrUpdateUserMembershipDto } from './dto/create-user-membership.dto';
import { GetUserMembershipDto } from './dto/get-user-membership.dto';

@Injectable()
export class UserMembershipsService {
    constructor(
        @InjectRepository(UserMembershipEntity)
        private readonly userMembershipRepo: Repository<UserMembershipEntity>,
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
            throw new NotFoundException('User membership not found');
        }
        return userMembership;
    }

    /**
     * Create a new association between a user and a membership.
     * @param createUserMembershipDto - Data required for creation.
     * @returns The created association between a user and a membership.
     */
    async createUserMembership(userMembership: UserMembershipEntity): Promise<UserMembershipEntity> {
        return this.userMembershipRepo.save(userMembership);
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
            throw new NotFoundException('User membership not found');
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
            throw new NotFoundException('User membership not found');
        }
        this.userMembershipRepo.merge(existingUserMembership, patchUserMembershipDto);

        return this.userMembershipRepo.save(existingUserMembership);
    }
}

