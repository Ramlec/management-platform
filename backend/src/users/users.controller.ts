import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateOrUpdateUserDto } from "./dto/create-update-user.dto";
import { UsersService } from "./users.service";
import { UserEntity } from "./entities/user.entity";
import { plainToInstance } from "class-transformer";
import { UserResponseDto } from "./dto/user-response.dto";
import { PatchUserDto } from "./dto/patch-user.dto";
import { GetUserDto } from "./dto/get-user.dto";

@Controller(`users`)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    /**
     * List all users.
     * @returns All users.
     */
    @Get()
    async listUsers(): Promise<UserResponseDto[]> {
        const users = await this.usersService.listUsers();
        return plainToInstance(UserResponseDto, users, { excludeExtraneousValues: true });
    }

    /**
     * Get a user by id.
     * @param id - The id of the user.
     * @returns The user.
     */
    @Get(`:id`)
    async getUser(@Param() { id }: GetUserDto): Promise<UserResponseDto> {
        const user = await this.usersService.getUser(id);
        return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
    }

    /**
     * Create a new user.
     * @param createUserDto - The user to create.
     * @returns The created user.
     */
    @Post()
    async createUser(
        @Body() createUserDto: CreateOrUpdateUserDto
    ): Promise<UserResponseDto> {
        const newUser = plainToInstance(UserEntity, createUserDto);

        const savedUser = await this.usersService.createUser(newUser);
        return plainToInstance(UserResponseDto, savedUser, { excludeExtraneousValues: true });
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
        @Body() patchUserDto: PatchUserDto
    ): Promise<UserResponseDto> {
        const user: Partial<UserEntity> = plainToInstance(UserEntity, patchUserDto);
        const updatedUser = await this.usersService.patchUser(id, user);
        return plainToInstance(UserResponseDto, updatedUser, { excludeExtraneousValues: true });
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
        @Body() updateUserDto: CreateOrUpdateUserDto
    ): Promise<UserResponseDto> {
        const user = plainToInstance(UserEntity, updateUserDto);
        const updatedUser = await this.usersService.updateOrCreateUser(id, user);
        const response = plainToInstance(UserResponseDto, updatedUser, { excludeExtraneousValues: true });

        const isNew = updatedUser.createdAt.getTime() === updatedUser.updatedAt.getTime();
        if (isNew) {
            throw new HttpException(response, HttpStatus.CREATED); // Could be an interceptor instead
        }

        return response;
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
}