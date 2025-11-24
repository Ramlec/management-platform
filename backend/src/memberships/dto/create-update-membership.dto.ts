import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { IsBefore } from "src/validators/is-before.validator";

export class CreateOrUpdateMembershipDto {
    @ApiProperty({
        description: `The description of the membership`,
        example: `This is a yearly membership`,
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({
        description: `The end date of the membership`,
        example: `2025-12-31T00:00:00.000Z`,
    })
    @IsDate({ message: `End date must be a valid date` })
    @IsNotEmpty({ message: `End date shouldn't be empty` })
    @Transform(({ value }: { value: Date | string }) => (value ? new Date(value) : value))
    endAt: Date;

    @ApiProperty({ description: `The name of the membership`, example: `Yearly Membership` })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: `The price of the membership`, example: 2.0 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({
        description: `The start date of the membership`,
        example: `2025-01-01T00:00:00.000Z`,
    })
    @IsBefore(`endAt`, { message: `Start date must be before end date` })
    @IsDate({ message: `Start date must be a valid date` })
    @IsNotEmpty({ message: `Start date shouldn't be empty` })
    @Transform(({ value }: { value: Date | string }) => (value ? new Date(value) : value))
    startAt: Date;
}
