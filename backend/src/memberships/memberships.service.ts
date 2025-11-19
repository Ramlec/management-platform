import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { MembershipEntity } from "./entities/membership.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserMembershipEntity } from "src/user-memberships/entities/user-membership.entity";

@Injectable()
export class MembershipsService {
    constructor(
        @InjectRepository(MembershipEntity)
        private readonly membershipRepository: Repository<MembershipEntity>,
        @InjectRepository(UserMembershipEntity)
        private readonly userMembershipRepository: Repository<UserMembershipEntity>,
    ) { }

    /**
     * Get all memberships.
     * @returns All memberships.
     */
    async listMemberships(): Promise<MembershipEntity[]> {
        return this.membershipRepository.find();
    }

    /**
     * Get a membership by id.
     * @param id - The id of the membership.
     * @returns The membership.
     */
    async getMembership(id: number): Promise<MembershipEntity> {
        const membership = await this.membershipRepository.findOne({ where: { id } });
        if (!membership) {
            throw new NotFoundException(`Membership not found`);
        }
        return membership;
    }

    /**
     * Create a new membership, if the membership already exists, an error will be thrown
     * @param membership - The membership to create.
     * @returns The created membership.
     */
    async createMembership(membership: MembershipEntity): Promise<MembershipEntity> {
        return this.membershipRepository.save(membership);
    }

    /**
     * Patch a membership, only the fields that are provided will be updated.
     * If the start date is after the end date, an error will be thrown.
     * @param id - The id of the membership.
     * @param membership - The membership data to patch.
     * @returns The patched membership.
     * @status 400 BAD REQUEST if the start date is after the end date.
     */
    async patchMembership(
        id: number,
        membership: Partial<MembershipEntity>,
    ): Promise<MembershipEntity> {
        const existingMembership = await this.membershipRepository.findOne({
            where: { id },
        });
        if (!existingMembership) {
            throw new NotFoundException(`Membership not found`);
        }
        if (
            membership.startAt &&
            new Date(membership.startAt) > new Date(existingMembership.endAt)
        ) {
            throw new BadRequestException(`Start date must be before end date`);
        }
        if (membership.endAt && new Date(membership.endAt) < new Date(existingMembership.startAt)) {
            throw new BadRequestException(`End date must be after start date`);
        }

        this.membershipRepository.merge(existingMembership, membership);

        return this.membershipRepository.save(existingMembership);
    }

    /**
     * Update a membership, all the fields will be updated.
     * If the membership does not exist, it will be created.
     * @param id - The id of the membership.
     * @param membership - The membership data to update.
     * @returns The updated membership.
     */
    async updateMembership(id: number, membership: MembershipEntity): Promise<MembershipEntity> {
        membership.id = id; // Ensure the id is set to the one passed in the parameters

        const existingMembership = await this.membershipRepository.findOne({
            where: { id },
        });

        if (!existingMembership) {
            return this.createMembership(membership);
        }

        this.membershipRepository.merge(existingMembership, membership);
        return this.membershipRepository.save(existingMembership);
    }

    /**
     * Delete a membership (soft delete), if the membership does not exist or is associated with user memberships, an error will be thrown.
     * @param id - The id of the membership.
     * @returns The delete result.
     * @status 404 NOT FOUND if the membership does not exist.
     * @status 400 BAD REQUEST if the membership is associated with user memberships.
     */
    async deleteMembership(id: number): Promise<void> {
        const countExistingMembership = await this.membershipRepository.count({
            where: { id },
        });
        if (countExistingMembership === 0) {
            throw new NotFoundException(`Membership not found`);
        }
        const countAssociatedUserMemberships = await this.userMembershipRepository.count({
            where: { membershipId: id },
        });
        if (countAssociatedUserMemberships > 0) {
            throw new BadRequestException(
                `Membership is associated with user memberships, cannot delete`,
            );
        }
        await this.membershipRepository.delete(id);
    }
}
