import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

export class GetMembershipDto {
    @ApiProperty({ description: 'The id of the membership', example: 1 })
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    id: number;
}