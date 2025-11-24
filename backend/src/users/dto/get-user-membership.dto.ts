import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

import { GetUserDto } from "./get-user.dto";

export class GetUserMembershipDto extends GetUserDto {
    @ApiProperty({ description: `The id of the membership`, example: 1 })
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    membershipId: number;
}
