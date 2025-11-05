import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';


export class CreateOrUpdateUserDto {
    @ApiProperty({ description: 'The first name of the user', example: 'John' })
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'The phone number of the user', example: '+33612345678', nullable: true })
    @IsPhoneNumber()
    @IsOptional()
    phone?: string;
}