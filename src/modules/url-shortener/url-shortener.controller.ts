import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { UrlDto } from './dtos/url.dto';
import { UrlShortenerService } from './url-shortener.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UrlIdentifierDto } from './dtos/url-identifier.dto';

@Controller()
export class UrlShortenerController {
    constructor(private readonly urlShortenerService: UrlShortenerService) {}

    @ApiOperation({ summary: 'Shorten URL' })
    @ApiOkResponse({ description: 'Shortened URL', type: String })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('shorten')
    async shortenUrl(
        @Body() urlDto: UrlDto,
        @Req() req: Request,
    ): Promise<string> {
        const urlIdentifier = await this.urlShortenerService.shortenUrl(
            urlDto.url,
            req.user.sub,
        );
        return `http://localhost:3000/api/${urlIdentifier}`;
    }

    @ApiOperation({ summary: 'Redirect to original link' })
    @Get(':identifier')
    async resolveUrl(
        @Param() identifier: UrlIdentifierDto,
        @Res() res: Response,
    ) {
        const url = await this.urlShortenerService.resolveUrl(
            identifier.identifier,
        );
        if (!url) {
            throw new NotFoundException('URL not found');
        }
        res.redirect(url);
    }
}
