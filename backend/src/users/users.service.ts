import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    /**
     * Create a new user, if the user already exists, an error will be thrown
     * @param user - The user to create.
     * @returns The created user.
     */
    async createUser(user: UserEntity): Promise<UserEntity> {
        const existingUser = await this.userRepository.findOne({
            where: { email: user.email },
        });

        if (existingUser) {
            throw new ConflictException(`User with this email already exists`);
        }

        return this.userRepository.save(user);
    }

    /**
     * Delete a user (soft delete), if the user does not exist, an error will be thrown.
     * @param id - The id of the user.
     * @returns The delete result.
     */
    async deleteUser(id: number): Promise<void> {
        const existingUser = await this.userRepository.findOne({
            where: { id },
        });
        if (!existingUser) {
            throw new NotFoundException(`User not found`);
        }
        await this.userRepository.softDelete(id);
    }

    /**
     * Get a user by id.
     * @param id - The id of the user.
     * @returns The user.
     */
    async getUser(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return user;
    }

    /**
     * List all users.
     * @returns All users.
     */
    async listUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    /**
     * Patch a user, only the fields that are provided will be updated.
     * @param id - The id of the user.
     * @param user - The user data to patch.
     * @returns The patched user.
     */
    async patchUser(id: number, user: Partial<UserEntity>): Promise<UserEntity> {
        const existingUser = await this.userRepository.findOne({
            where: { id },
        });

        if (!existingUser) {
            throw new NotFoundException(`User not found`);
        }

        this.userRepository.merge(existingUser, user);

        return this.userRepository.save(existingUser);
    }

    /**
     * Update a user, all the fields will be updated.
     * If the user does not exist, it will be created.
     * @param id - The id of the user.
     * @param user - The user data to update.
     * @returns The updated user.
     */
    async updateOrCreateUser(id: number, user: UserEntity): Promise<UserEntity> {
        user.id = id; // Ensure the id is set to the one passed in the parameters

        const existingUser = await this.userRepository.findOne({
            where: { id },
        });

        if (!existingUser) {
            return this.createUser(user);
        }

        this.userRepository.merge(existingUser, user);
        return this.userRepository.save(existingUser);
    }
}
