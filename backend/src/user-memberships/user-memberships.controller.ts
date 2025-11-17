import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { CreateOrUpdateUserMembershipDto } from "./dto/create-user-membership.dto";
import { GetUserMembershipDto } from "./dto/get-user-membership.dto";
import { PatchUserMembershipDto } from "./dto/patch-user-membership.dto";
import { UserMembershipResponseDto } from "./dto/user-membership-response.dto";
import { UserMembershipEntity } from "./entities/user-membership.entity";
import { UserMembershipsService } from "./user-memberships.service";

@Controller(`user-memberships`)
export class UserMembershipsController {
    constructor(private readonly userMembershipsService: UserMembershipsService) { }

    /**
     * Create a new user membership.
     * @param createUserMembership - The user membership to create.
     * @returns The created user membership.
     */
    @Post()
    async createUserMembership(
        @Body() createUserMembership: CreateOrUpdateUserMembershipDto,
    ): Promise<UserMembershipResponseDto> {
        const newUserMembership = plainToInstance(UserMembershipEntity, createUserMembership);
        const savedUserMembership =
            await this.userMembershipsService.createUserMembership(newUserMembership);
        return plainToInstance(UserMembershipResponseDto, savedUserMembership, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * Get a user membership by id.
     * @param id - The id of the user membership.
     * @returns The user membership.
     */
    @Get(`:id`)
    async getUserMembership(
        @Param() { id }: GetUserMembershipDto,
    ): Promise<UserMembershipResponseDto> {
        const userMembership = await this.userMembershipsService.getUserMembership(id);
        return plainToInstance(UserMembershipResponseDto, userMembership, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * List all user memberships.
     * @returns All user memberships.
     */
    @Get()
    async listUserMemberships(): Promise<UserMembershipResponseDto[]> {
        const userMemberships = await this.userMembershipsService.listUserMemberships();
        return plainToInstance(UserMembershipResponseDto, userMemberships, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * Patch a user membership, only the fields that are provided will be updated.
     * @param id - The id of the user membership.
     * @param patchUserMembershipDto - The user membership to patch.
     * @returns The patched user membership.
     */
    @Patch(`:id`)
    async patchUserMembership(
        @Param() { id }: GetUserMembershipDto,
        @Body() patchUserMembershipDto: PatchUserMembershipDto,
    ): Promise<UserMembershipResponseDto> {
        const userMembership = plainToInstance(UserMembershipEntity, patchUserMembershipDto);
        const updatedUserMembership = await this.userMembershipsService.patchUserMembership(
            id,
            userMembership,
        );
        return plainToInstance(UserMembershipResponseDto, updatedUserMembership, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * Update a user membership, all the fields will be updated.
     * If the user membership does not exist, it will be created.
     * @param id - The id of the user membership.
     * @param updateUserMembershipDto - The user membership to update.
     * @returns The updated or created user membership.
     * @status 200 OK if the user membership was updated.
     * @status 201 CREATED if the user membership was created.
     */
    @Put(`:id`)
    async updateUserMembership(
        @Param() { id }: GetUserMembershipDto,
        @Body() updateUserMembershipDto: CreateOrUpdateUserMembershipDto,
    ): Promise<UserMembershipResponseDto> {
        const updatedUserMembership = plainToInstance(
            UserMembershipEntity,
            updateUserMembershipDto,
        );
        const savedUserMembership = await this.userMembershipsService.updateUserMembership(
            id,
            updatedUserMembership,
        );
        const response = plainToInstance(UserMembershipResponseDto, savedUserMembership, {
            excludeExtraneousValues: true,
        });

        /*
         * TODO: Use an interceptor instead.
         * FIXME: Could lead to misleading http status code if created and updated at are not the same.
         * The isNew detection using createdAt.getTime() === updatedAt.getTime() is unreliable because
         * database timestamp precision and timing can cause these values to differ even for newly created records,
         * leading to incorrect HTTP status codes (200 instead of 201) being returned for new resources.
         * A more reliable approach would be to use a flag in the database to track if the resource is new
         * but that would imply the service to return isNew object.
         */
        const isNew =
            savedUserMembership.createdAt.getTime() === savedUserMembership.updatedAt.getTime();
        if (isNew) {
            throw new HttpException(response, HttpStatus.CREATED);
        }

        return response;
    }
}
