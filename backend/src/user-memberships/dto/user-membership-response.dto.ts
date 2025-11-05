import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserMembershipResponseDto {
    @ApiProperty({ description: 'The id of the user associated with the user membership', example: 1 })
    @Expose()
    userId: number;

    @ApiProperty({ description: 'The id of the membership associated with the user membership', example: 1 })
    @Expose()
    membershipId: number;
}

