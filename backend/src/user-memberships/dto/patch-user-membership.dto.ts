import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class PatchUserMembershipDto {
    @ApiProperty({ description: 'Whether the user membership is paid', example: false })
    @IsBoolean()
    @IsOptional()
    isPaid: boolean;

    @ApiProperty({ description: 'Whether the user membership has a newsletter subscription', example: false })
    @IsBoolean()
    @IsOptional()
    hasNewsletterSubscription: boolean;

    @ApiProperty({ description: 'Whether the user membership has a shifts subscription', example: false })
    @IsBoolean()
    @IsOptional()
    hasShiftsSubscription: boolean;
}

