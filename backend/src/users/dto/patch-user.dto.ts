import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { UserRoles } from "src/auth/roles/roles.enum";


export class PatchUserDto {
    @ApiProperty({ description: `The first name of the user`, example: `John` })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstname: string;

    @ApiProperty({ description: `The last name of the user`, example: `Doe` })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastname: string;

    @ApiProperty({ description: `The email of the user`, example: `john.doe@example.com` })
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email: string;

    @ApiProperty({ description: `The phone number of the user`, example: `+33612345678`, nullable: true })
    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @ApiProperty({ description: `The roles of the user`, example: [`member`, `admin`] })
    @IsArray()
    @IsEnum(UserRoles, { each: true })
    @IsOptional()
    roles?: UserRoles[];
}