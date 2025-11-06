import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { IsBefore } from "src/validators/is-before.validator";


export class CreateOrUpdateMembershipDto {
    @ApiProperty({ description: `The price of the membership`, example: 2.00 })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @ApiProperty({ description: `The name of the membership`, example: `Yearly Membership` })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: `The description of the membership`, example: `This is a yearly membership` })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ description: `The start date of the membership`, example: `2025-01-01T00:00:00.000Z` })
    @IsDate({ message: `Start date must be a valid date` })
    @Transform(({ value }) => value ? new Date(value) : value)
    @IsNotEmpty({ message: `Start date shouldn't be empty` })
    @IsBefore(`endAt`, { message: `Start date must be before end date` })
    startAt: Date;

    @ApiProperty({ description: `The end date of the membership`, example: `2025-12-31T00:00:00.000Z` })
    @Transform(({ value }) => value ? new Date(value) : value)
    @IsDate({ message: `End date must be a valid date` })
    @IsNotEmpty({ message: `End date shouldn't be empty` })
    endAt: Date;
}