import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';


export class UserResponseDto {
    @ApiProperty({ description: 'The id of the user', example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ description: 'The first name of the user', example: 'John' })
    @Expose()
    firstname: string;

    @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
    @Expose()
    lastname: string;

    @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com' })
    @Expose()
    email: string;

    @ApiProperty({ description: 'The phone number of the user', example: '+33612345678', nullable: true })
    @Expose()
    phone?: string;

    @ApiProperty({ description: 'The date the user was created', example: '2021-01-01T00:00:00.000Z' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ description: 'The date the user was updated', example: '2021-01-01T00:00:00.000Z' })
    @Expose()
    updatedAt: Date;

    @Exclude()
    deletedAt?: Date;
}