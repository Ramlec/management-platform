import { UserRoles } from "src/auth/roles/roles.enum";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity(`users`)
export class UserEntity extends BaseEntity {
    @CreateDateColumn({ name: `created_at` })
    createdAt: Date;

    @DeleteDateColumn({ name: `deleted_at` })
    deletedAt?: Date;

    @Column({ length: 255, type: `varchar`, unique: true })
    @Index({ unique: true })
    email: string;

    @Column({ length: 100, type: `varchar` })
    firstname: string;

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, type: `varchar` })
    lastname: string;

    @Column({ length: 20, nullable: true, type: `varchar` })
    phone?: string;

    //TODO: Move this logic to database with an association table. Need to look to make role dynamic on Nest side.
    @Column({
        default: UserRoles.USER,
        type: `simple-array`,
    })
    roles: UserRoles[];

    @UpdateDateColumn({ name: `updated_at` })
    updatedAt: Date;
}
