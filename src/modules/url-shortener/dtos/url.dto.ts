import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UrlDto {
    @ApiProperty({
        description: 'The URL to be shortened',
        example: 'https://www.google.com',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    url: string;
}
