import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UrlIdentifierDto {
    @ApiProperty({
        description: 'The identifier of the url',
        example: 'https://www.google.com',
        type: String,
        maximum: 7,
    })
    @IsString({})
    @IsNotEmpty()
    @Length(7)
    identifier: string;
}
