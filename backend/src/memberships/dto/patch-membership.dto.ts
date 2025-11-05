import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Min } from 'class-validator';


export class PatchMembershipDto {
    @ApiProperty({ description: 'The price of the membership', example: 2.00 })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @IsOptional()
    price: number;

    @ApiProperty({ description: 'The name of the membership', example: 'Yearly Membership' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @ApiProperty({ description: 'The description of the membership', example: 'This is a yearly membership' })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ description: 'The start date of the membership', example: '2025-01-01T00:00:00.000Z' })
    @Transform(({ value }) => value ? new Date(value) : value)
    @IsDate({ message: 'Start date must be a valid date' })
    @IsOptional()
    startAt: Date;

    @ApiProperty({ description: 'The end date of the membership', example: '2025-12-31T00:00:00.000Z' })
    @Transform(({ value }) => value ? new Date(value) : value)
    @IsDate({ message: 'End date must be a valid date' })
    @IsOptional()
    endAt: Date;
}