import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
    IsArray,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from "class-validator";
import { UserRoles } from "src/auth/roles/roles.enum";

export class CreateOrUpdateUserDto {
    @ApiProperty({
        description: `The email of the user`,
        example: `john.doe@example.com`,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: `The first name of the user`,
        example: `John`,
    })
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({
        description: `The last name of the user`,
        example: `Doe`,
    })
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty({
        description: `The phone number of the user`,
        example: `+33612345678`,
        nullable: true,
    })
    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @ApiProperty({
        default: [UserRoles.USER],
        description: `The roles of the user`,
        example: [`member`, `admin`],
    })
    @IsArray()
    @IsEnum(UserRoles, {
        each: true,
    })
    @IsOptional()
    @Transform(({ value }: { value: undefined | UserRoles[] }) => value ?? [UserRoles.USER])
    roles: UserRoles[];
}
