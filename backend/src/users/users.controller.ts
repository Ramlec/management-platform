import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserMembershipResponseDto } from "src/user-memberships/dto/user-membership-response.dto";
import { UserMembershipsService } from "src/user-memberships/user-memberships.service";

import { CreateOrUpdateUserDto } from "./dto/create-update-user.dto";
import { GetUserMembershipDto } from "./dto/get-user-membership.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { PatchUserDto } from "./dto/patch-user.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller(`users`)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly userMembershipsService: UserMembershipsService,
    ) { }

    /**
     * Create a new user.
     * @param createUserDto - The user to create.
     * @returns The created user.
     */
    @Post()
    async createUser(
        @Body() createUserDto: CreateOrUpdateUserDto,
    ): Promise<UserResponseDto> {
        const newUser = plainToInstance(UserEntity, createUserDto);

        const savedUser = await this.usersService.createUser(newUser);
        return plainToInstance(UserResponseDto, savedUser, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * Delete a user.
     * @param id - The id of the user.
     * @returns The delete result.
     */
    @Delete(`:id`)
    async deleteUser(@Param() { id }: GetUserDto): Promise<void> {
        await this.usersService.deleteUser(id);
    }

    /**
     * Get the active membership for a specific user (based on current date).
     * @param id - The id of the user.
     * @returns The active membership for this user, or null if no active membership.
     */
    @Get(`:id/memberships/active`)
    async getActiveMembership(
        @Param() { id }: GetUserDto,
    ): Promise<null | UserMembershipResponseDto> {
        const activeMembership =
            await this.userMembershipsService.getActiveMembership(id);
        if (!activeMembership) {
            return null;
        }
        return plainToInstance(UserMembershipResponseDto, activeMembership, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * Get a user by id.
     * @param id - The id of the user.
     * @returns The user.
     */
    @Get(`:id`)
    async getUser(@Param() { id }: GetUserDto): Promise<UserResponseDto> {
        const user = await this.usersService.getUser(id);
        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * Get a specific membership for a user by userId and membershipId.
     * @param id - The user id.
     * @param membershipId - The membership id.
     * @returns The user membership.
     */
    @Get(`:id/memberships/:membershipId`)
    async getUserMembershipByUserAndMembership(
        @Param() { id, membershipId }: GetUserMembershipDto,
    ): Promise<UserMembershipResponseDto> {
        const userMembership =
            await this.userMembershipsService.getUserMembershipByUserAndMembership(
                id,
                membershipId,
            );
        return plainToInstance(UserMembershipResponseDto, userMembership, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * Get all memberships for a specific user.
     * @param id - The id of the user.
     * @returns All memberships for this user.
     */
    @Get(`:id/memberships`)
    async getUserMemberships(
        @Param() { id }: GetUserDto,
    ): Promise<UserMembershipResponseDto[]> {
        const userMemberships =
            await this.userMembershipsService.getUserMemberships(id);
        return plainToInstance(UserMembershipResponseDto, userMemberships, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * List all users.
     * @returns All users.
     */
    @Get()
    async listUsers(): Promise<UserResponseDto[]> {
        const users = await this.usersService.listUsers();
        return plainToInstance(UserResponseDto, users, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * Patch a user, only the fields that are provided will be updated.
     * @param id - The id of the user.
     * @param patchUserDto - The user data to patch.
     * @returns The patched user.
     */
    @Patch(`:id`)
    async patchUser(
        @Param() { id }: GetUserDto,
        @Body() patchUserDto: PatchUserDto,
    ): Promise<UserResponseDto> {
        const user: Partial<UserEntity> = plainToInstance(UserEntity, patchUserDto);
        const updatedUser = await this.usersService.patchUser(id, user);
        return plainToInstance(UserResponseDto, updatedUser, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * Update a user, all the fields will be updated.
     * If the user does not exist, it will be created.
     * @param id - The id of the user.
     * @param updateUserDto - The user data to update.
     * @returns The updated or created user.
     * @status 200 OK if the user was updated.
     * @status 201 CREATED if the user was created.
     */
    @Put(`:id`)
    async updateUser(
        @Param() { id }: GetUserDto,
        @Body() updateUserDto: CreateOrUpdateUserDto,
    ): Promise<UserResponseDto> {
        const user = plainToInstance(UserEntity, updateUserDto);
        const updatedUser = await this.usersService.updateOrCreateUser(id, user);
        const response = plainToInstance(UserResponseDto, updatedUser, {
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
            updatedUser.createdAt.getTime() === updatedUser.updatedAt.getTime();
        if (isNew) {
            throw new HttpException(response, HttpStatus.CREATED); // Could be an interceptor instead
        }

        return response;
    }
}
