import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateOrUpdateUserMembershipDto {
    @ApiProperty({
        description: "Whether the user membership has a newsletter subscription",
        example: false,
    })
    @IsBoolean()
    @IsOptional()
    hasNewsletterSubscription: boolean;

    @ApiProperty({
        description: "Whether the user membership has a shifts subscription",
        example: false,
    })
    @IsBoolean()
    @IsOptional()
    hasShiftsSubscription: boolean;

    @ApiProperty({ description: "Whether the user membership is paid", example: false })
    @IsBoolean()
    @IsOptional()
    isPaid: boolean;

    @ApiProperty({
        description: "The id of the membership associated with the user membership",
        example: 1,
    })
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    membershipId: number;

    @ApiProperty({
        description: "The id of the user associated with the user membership",
        example: 1,
    })
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    userId: number;
}
