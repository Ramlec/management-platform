import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>) { }


    /**
     * List all users.
     * @returns All users.
     */
    async listUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    /**
     * Get a user by id.
     * @param id - The id of the user.
     * @returns The user.
     */
    async getUser(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

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
            throw new ConflictException('User with this email already exists');
          }

        return this.userRepository.save(user);
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
            throw new NotFoundException('User not found');
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
    async updateUser(id: number, user: UserEntity): Promise<UserEntity> {
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

    /**
     * Delete a user, if the user does not exist, an error will be thrown.
     * @param id - The id of the user.
     * @returns The delete result.
     */
    async deleteUser(id: number): Promise<void> {
        const existingUser = await this.userRepository.findOne({
            where: { id },
        });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.delete(id);
    }
}