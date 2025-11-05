import { ApiProperty } from "@nestjs/swagger";
import { MembershipEntity } from "src/memberships/entities/membership.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity(`user_memberships`)
@Index([`userId`, `membershipId`])
@Unique([`userId`, `membershipId`])
export class UserMembershipEntity extends BaseEntity {
    @ApiProperty({ description: `The id of the user membership`, example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: `The id of the user associated with the user membership`, example: 1 })
    @Column({ name: `user_id` })
    userId: number;

    @ApiProperty({ description: `The id of the membership associated with the user membership`, example: 1 })
    @Column({ name: `membership_id` })
    membershipId: number;

    @ApiProperty({ description: `The user associated with the user membership`, type: UserEntity })
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: `user_id` })
    user: UserEntity;

    @ApiProperty({ description: `The membership associated with the user membership`, type: MembershipEntity })
    @ManyToOne(() => MembershipEntity)
    @JoinColumn({ name: `membership_id` })
    membership: MembershipEntity;

    @ApiProperty({ description: `Whether the user membership is paid`, example: false })
    @Column({ name: `is_paid`, default: false })
    isPaid: boolean;

    @ApiProperty({ description: `Whether the user membership has a newsletter subscription`, example: false })
    @Column({ name: `has_newsletter_subscription`, default: false })
    hasNewsletterSubscription: boolean;

    @ApiProperty({ description: `Whether the user membership has a shifts subscription`, example: false })
    @Column({ name: `has_shifts_subscription`, default: false })
    hasShiftsSubscription: boolean;

    @ApiProperty({ description: `The date the user membership was created`, example: '2021-01-01T00:00:00.000Z' })
    @CreateDateColumn({ name: `created_at` })
    createdAt: Date;

    @ApiProperty({ description: `The date the user membership was last updated`, example: '2021-01-01T00:00:00.000Z' })
    @UpdateDateColumn({ name: `updated_at` })
    updatedAt: Date;
}

