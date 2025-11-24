import {
    BaseEntity,
    Check,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Check(`"startAt" < "endAt"`)
@Entity(`memberships`)
export class MembershipEntity extends BaseEntity {
    @CreateDateColumn({ name: `created_at` })
    createdAt: Date;

    @Column({ nullable: true, type: `text` })
    description?: string;

    @Column({ type: `timestamp without time zone` })
    endAt: Date;

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, type: `varchar` })
    name: string;

    @Column({ precision: 10, scale: 2, type: `decimal` })
    price: number;

    @Column({ type: `timestamp without time zone` })
    startAt: Date;

    @UpdateDateColumn({ name: `updated_at` })
    updatedAt: Date;
}
