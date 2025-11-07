import { BaseEntity, Check, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity(`memberships`)
@Check(`"startAt" < "endAt"`)
export class MembershipEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: `decimal`, precision: 10, scale: 2 })
    price: number;

    @Column({ type: `varchar`, length: 255 })
    name: string;

    @Column({ type: `timestamp without time zone` })
    startAt: Date;

    @Column({ type: `timestamp without time zone` })
    endAt: Date;

    @Column({ type: `text`, nullable: true })
    description?: string;

    @CreateDateColumn({ name: `created_at` })
    createdAt: Date;

    @UpdateDateColumn({ name: `updated_at` })
    updatedAt: Date;

    @DeleteDateColumn({ name: `deleted_at` })
    deletedAt?: Date;
}