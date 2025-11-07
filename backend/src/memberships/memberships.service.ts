import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { MembershipEntity } from "./entities/membership.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MembershipsService {
    constructor(
        @InjectRepository(MembershipEntity)
        private readonly membershipRepository: Repository<MembershipEntity>) { }

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
    async patchMembership(id: number, membership: Partial<MembershipEntity>): Promise<MembershipEntity> {
        const existingMembership = await this.membershipRepository.findOne({
            where: { id },
        });
        if (!existingMembership) {
            throw new NotFoundException(`Membership not found`);
        }
        if (membership.startAt && new Date(membership.startAt) > new Date(existingMembership.endAt)) {
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
     * Delete a membership (soft delete), if the membership does not exist, an error will be thrown.
     * @param id - The id of the membership.
     * @returns The delete result.
     * @status 404 NOT FOUND if the membership does not exist.
     */
    async deleteMembership(id: number): Promise<void> {
        const existingMembership = await this.membershipRepository.findOne({
            where: { id },
        });
        if (!existingMembership) {
            throw new NotFoundException(`Membership not found`);
        }
        await this.membershipRepository.softDelete(id);
    }
}