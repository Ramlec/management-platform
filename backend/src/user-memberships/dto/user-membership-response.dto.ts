import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { MembershipResponseDto } from "src/memberships/dto/membership-response";

export class UserMembershipResponseDto {
    @ApiProperty({ description: `The id of the user membership`, example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ description: `The id of the user associated with the user membership`, example: 1 })
    @Expose()
    userId: number;

    @ApiProperty({ description: `The id of the membership associated with the user membership`, example: 1 })
    @Expose()
    membershipId: number;

    @ApiProperty({ description: `Whether the user membership is paid`, example: false })
    @Expose()
    isPaid: boolean;

    @ApiProperty({ description: `Whether the user membership has a newsletter subscription`, example: false })
    @Expose()
    hasNewsletterSubscription: boolean;

    @ApiProperty({ description: `Whether the user membership has a shifts subscription`, example: false })
    @Expose()
    hasShiftsSubscription: boolean;

    @ApiProperty({ description: `The date the user membership was created`, example: `2021-01-01T00:00:00.000Z` })
    @Expose()
    createdAt: Date;

    @ApiProperty({ description: `The date the user membership was last updated`, example: `2021-01-01T00:00:00.000Z` })
    @Expose()
    updatedAt: Date;

    @Exclude()
    deletedAt?: Date;

    @ApiProperty({ description: `The membership details`, type: MembershipResponseDto })
    @Expose()
    @Type(() => MembershipResponseDto)
    membership?: MembershipResponseDto;
}

