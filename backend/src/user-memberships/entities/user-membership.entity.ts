import { ApiProperty } from "@nestjs/swagger";
import { MembershipEntity } from "src/memberships/entities/membership.entity";
import { UserEntity } from "src/users/entities/user.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";

@Entity(`user_memberships`)
@Index([`userId`, `membershipId`])
@Unique([`userId`, `membershipId`])
export class UserMembershipEntity extends BaseEntity {
    @ApiProperty({
        description: `The date the user membership was created`,
        example: "2021-01-01T00:00:00.000Z",
    })
    @CreateDateColumn({ name: `created_at` })
    createdAt: Date;

    @ApiProperty({
        description: `Whether the user membership has a newsletter subscription`,
        example: false,
    })
    @Column({ default: false, name: `has_newsletter_subscription` })
    hasNewsletterSubscription: boolean;

    @ApiProperty({
        description: `Whether the user membership has a shifts subscription`,
        example: false,
    })
    @Column({ default: false, name: `has_shifts_subscription` })
    hasShiftsSubscription: boolean;

    @ApiProperty({ description: `The id of the user membership`, example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: `Whether the user membership is paid`, example: false })
    @Column({ default: false, name: `is_paid` })
    isPaid: boolean;

    @ApiProperty({
        description: `The membership associated with the user membership`,
        type: MembershipEntity,
    })
    @JoinColumn({ name: `membership_id` })
    @ManyToOne(() => MembershipEntity)
    membership: MembershipEntity;

    @ApiProperty({
        description: `The id of the membership associated with the user membership`,
        example: 1,
    })
    @Column({ name: `membership_id` })
    membershipId: number;

    @ApiProperty({
        description: `The date the user membership was last updated`,
        example: "2021-01-01T00:00:00.000Z",
    })
    @UpdateDateColumn({ name: `updated_at` })
    updatedAt: Date;

    @ApiProperty({ description: `The user associated with the user membership`, type: UserEntity })
    @JoinColumn({ name: `user_id` })
    @ManyToOne(() => UserEntity)
    user: UserEntity;

    @ApiProperty({
        description: `The id of the user associated with the user membership`,
        example: 1,
    })
    @Column({ name: `user_id` })
    userId: number;
}
