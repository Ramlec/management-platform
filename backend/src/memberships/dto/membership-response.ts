import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';


export class MembershipResponseDto {
    @ApiProperty({ description: 'The id of the membership', example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ description: 'The price of the membership', example: 2.00 })
    @Expose()
    price: number;

    @ApiProperty({ description: 'The name of the membership', example: 'Yearly Membership' })
    @Expose()
    name: string;

    @ApiProperty({ description: 'The description of the membership', example: 'This is a yearly membership' })
    @Expose()
    description: string;

    @ApiProperty({ description: 'The start date of the membership', example: '2025-01-01T00:00:00.000Z' })
    @Expose()
    startAt: Date;

    @ApiProperty({ description: 'The end date of the membership', example: '2025-12-31T00:00:00.000Z' })
    @Expose()
    endAt: Date;

    @ApiProperty({ description: 'The date the membership was created', example: '2021-01-01T00:00:00.000Z' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ description: 'The date the membership was updated', example: '2021-01-01T00:00:00.000Z' })
    @Expose()
    updatedAt: Date;

    @Exclude()
    deletedAt?: Date;
}