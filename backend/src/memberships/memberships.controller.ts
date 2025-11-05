import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateOrUpdateMembershipDto } from "./dto/create-update-membership.dto";
import { MembershipsService } from "./memberships.service";
import { MembershipEntity } from "./entities/membership.entity";
import { plainToInstance } from "class-transformer";
import { MembershipResponseDto } from "./dto/membership-response";
import { PatchMembershipDto } from "./dto/patch-membership.dto";
import { GetMembershipDto } from "./dto/get-membership.dto";

@Controller('memberships')
export class MembershipsController {
    constructor(private readonly membershipsService: MembershipsService) { }

    /**
     * List all memberships.
     * @returns All memberships.
     */
    @Get()
    async listMemberships(): Promise<MembershipResponseDto[]> {
        const memberships = await this.membershipsService.listMemberships();
        return plainToInstance(MembershipResponseDto, memberships, { excludeExtraneousValues: true });
    }

    /**
     * Get a membership by id.
     * @param id - The id of the membership.
     * @returns The membership.
     */
    @Get(':id')
    async getMembership(@Param() { id }: GetMembershipDto): Promise<MembershipResponseDto> {
        const membership = await this.membershipsService.getMembership(id);
        return plainToInstance(MembershipResponseDto, membership, { excludeExtraneousValues: true });
    }

    /**
     * Create a new membership.
     * @param createMembershipDto - The membership to create.
     * @returns The created membership.
     */
    @Post()
    async createMembership(
        @Body() createMembershipDto: CreateOrUpdateMembershipDto
    ): Promise<MembershipResponseDto> {
        const newMembership = plainToInstance(MembershipEntity, createMembershipDto);

        const savedMembership = await this.membershipsService.createMembership(newMembership);
        return plainToInstance(MembershipResponseDto, savedMembership, { excludeExtraneousValues: true });
    }

    /**
     * Patch a membership, only the fields that are provided will be updated.
     * @param id - The id of the user.
     * @param patchMembershipDto - The membership data to patch.
     * @returns The patched membership.
     */
    @Patch(':id')
    async patchMembership(
        @Param() { id }: GetMembershipDto,
        @Body() patchMembershipDto: PatchMembershipDto
    ): Promise<MembershipResponseDto> {
        const membership: Partial<MembershipEntity> = plainToInstance(MembershipEntity, patchMembershipDto);
        const updatedMembership = await this.membershipsService.patchMembership(id, membership);
        return plainToInstance(MembershipResponseDto, updatedMembership, { excludeExtraneousValues: true });
    }

    /**
     * Update a membership, all the fields will be updated.
     * If the membership does not exist, it will be created.
     * @param id - The id of the membership.
     * @param updateMembershipDto - The membership data to update.
     * @returns The updated or created membership.
     * @status 200 OK if the membership was updated.
     * @status 201 CREATED if the membership was created.
     */
    @Put(':id')
    async updateMembership(
        @Param() { id }: GetMembershipDto,
        @Body() updateMembershipDto: CreateOrUpdateMembershipDto
    ): Promise<MembershipResponseDto> {
        const membership = plainToInstance(MembershipEntity, updateMembershipDto);
        const updatedMembership = await this.membershipsService.updateMembership(id, membership);
        const response = plainToInstance(MembershipResponseDto, updatedMembership, { excludeExtraneousValues: true });

        const isNew = updatedMembership.createdAt.getTime() === updatedMembership.updatedAt.getTime();
        if (isNew) {
            throw new HttpException(response, HttpStatus.CREATED); // Could be an interceptor instead
        }

        return response;
    }

    /**
     * Delete a membership.
     * @param id - The id of the membership.
     * @returns The delete result.
     */
    @Delete(':id')
    async deleteMembership(@Param() { id }: GetMembershipDto): Promise<void> {
        await this.membershipsService.deleteMembership(id);
    }
}