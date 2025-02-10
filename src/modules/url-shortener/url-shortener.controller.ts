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
import { UrlShortenerService } from './services/url-shortener.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UrlIdentifierDto } from './dtos/url-identifier.dto';
import { VisitsService } from './services/visits.service';
import { VisitStats } from '../../types/visits';
@Controller()
export class UrlShortenerController {
    constructor(
        private readonly urlShortenerService: UrlShortenerService,
        private readonly visitsService: VisitsService,
    ) {}

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
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        return `${baseUrl}/${urlIdentifier}`;
    }

    @ApiOperation({ summary: 'Get shortened urls stats' })
    @ApiOkResponse({ description: 'Stats for a user urls' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('stats')
    async getStats(@Req() req: Request) {
        return await this.visitsService.visitsStats(
            req.user.sub,
            `${req.protocol}://${req.get('host')}`,
        );
    }

    @ApiOperation({ summary: 'Redirect to original link' })
    @Get(':identifier')
    async resolveUrl(
        @Param() identifier: UrlIdentifierDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const url = await this.urlShortenerService.resolveUrl(
            identifier.identifier,
        );

        const ipAddress =
            (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
            req.socket.remoteAddress ||
            req.ip;

        await this.visitsService.createVisit(
            url.id,
            ipAddress,
            req.headers['user-agent'],
        );

        res.redirect(url.original_url);
    }
}
