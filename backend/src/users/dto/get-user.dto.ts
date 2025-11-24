import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

export class GetUserDto {
    @ApiProperty({ description: `The id of the user`, example: 1 })
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    id: number;
}
