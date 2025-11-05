import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { UserRoles } from "src/auth/roles/roles.enum";


export class CreateOrUpdateUserDto {
    @ApiProperty({
        description: `The first name of the user`,
        example: `John`
    })
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({
        description: `The last name of the user`,
        example: `Doe`
    })
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({
        description: `The email of the user`,
        example: `john.doe@example.com`
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: `The phone number of the user`,
        example: `+33612345678`,
        nullable: true
    })
    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @ApiProperty({
        description: `The roles of the user`,
        default: [UserRoles.USER],
        example: [`member`, `admin`]
    })
    @Transform(({ value }) => value ?? [UserRoles.USER])
    @IsArray()
    @IsEnum(UserRoles, {
        each: true
    })
    @IsOptional()
    roles: UserRoles[];
}