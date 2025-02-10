import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
} from 'class-validator';

export class AuthDto {
    @ApiProperty({
        description: 'User email',
        type: String,
        required: true,
        example: 'user@gmail.com',
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password',
        type: String,
        required: true,
        example: 'Str0ngP@ssword',
    })
    @IsString()
    @IsStrongPassword()
    password: string;
}
