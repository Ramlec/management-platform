import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { UserMembershipsService } from "./user-memberships.service";
import { UserMembershipEntity } from "./entities/user-membership.entity";
import { CreateOrUpdateUserMembershipDto } from "./dto/create-user-membership.dto";
import { plainToInstance } from "class-transformer";
import { GetUserMembershipDto } from "./dto/get-user-membership.dto";
import { UserMembershipResponseDto } from "./dto/user-membership-response.dto";
import { PatchUserMembershipDto } from "./dto/patch-user-membership.dto";

@Controller('user-memberships')
export class UserMembershipsController {
    constructor(private readonly userMembershipsService: UserMembershipsService) { }

    /**
     * List all user memberships.
     * @returns All user memberships.
     */
    @Get()
    async listUserMemberships(): Promise<UserMembershipResponseDto[]> {
        const userMemberships = await this.userMembershipsService.listUserMemberships();
        return plainToInstance(UserMembershipResponseDto, userMemberships, { excludeExtraneousValues: true });
    }

    /**
     * Get a user membership by id.
     * @param id - The id of the user membership.
     * @returns The user membership.
     */
    @Get(':id')
    async getUserMembership(@Param() { id }: GetUserMembershipDto): Promise<UserMembershipResponseDto> {
        const userMembership = await this.userMembershipsService.getUserMembership(id);
        return plainToInstance(UserMembershipResponseDto, userMembership, { excludeExtraneousValues: true });
    }

    /**
     * Create a new user membership.
     * @param createUserMembership - The user membership to create.
     * @returns The created user membership.
     */
    @Post()
    async createUserMembership(@Body() createUserMembership: CreateOrUpdateUserMembershipDto): Promise<UserMembershipResponseDto> {
        const newUserMembership = plainToInstance(UserMembershipEntity, createUserMembership);
        const savedUserMembership = await this.userMembershipsService.createUserMembership(newUserMembership);
        return plainToInstance(UserMembershipResponseDto, savedUserMembership, { excludeExtraneousValues: true });
    }

    /**
     * Update a user membership, all the fields will be updated.
     * If the user membership does not exist, it will be created.
     * @param id - The id of the user membership.
     * @param updateUserMembershipDto - The user membership to update.
     * @returns The updated user membership.
     */
    @Put(':id')
    async updateUserMembership(@Param() { id }: GetUserMembershipDto, @Body() updateUserMembershipDto: CreateOrUpdateUserMembershipDto): Promise<UserMembershipResponseDto> {
        const updatedUserMembership = plainToInstance(UserMembershipEntity, updateUserMembershipDto);
        const savedUserMembership = await this.userMembershipsService.updateUserMembership(id, updatedUserMembership);
        return plainToInstance(UserMembershipResponseDto, savedUserMembership, { excludeExtraneousValues: true });

    }

    /**
     * Patch a user membership, only the fields that are provided will be updated.
     * @param id - The id of the user membership.
     * @param patchUserMembershipDto - The user membership to patch.
     * @returns The patched user membership.
     */
    @Patch(':id')
    async patchUserMembership(@Param() { id }: GetUserMembershipDto, @Body() patchUserMembershipDto: PatchUserMembershipDto): Promise<UserMembershipResponseDto> {
        const userMembership = plainToInstance(UserMembershipEntity, patchUserMembershipDto);
        const updatedUserMembership = await this.userMembershipsService.patchUserMembership(id, userMembership);
        return plainToInstance(UserMembershipEntity, updatedUserMembership, { excludeExtraneousValues: true });
    }
}

