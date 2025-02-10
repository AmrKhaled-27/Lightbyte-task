import { Module } from '@nestjs/common';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './services/url-shortener.service';
import { UrlIdentifierService } from './services/url-identifier-generation.service';
import { AuthModule } from '../auth/auth.module';
import { UrlsRepository } from './repositories/urls.repository';
import { VisitsRepository } from './repositories/visits.repository';
import { VisitsService } from './services/visits.service';

@Module({
    imports: [AuthModule],
    controllers: [UrlShortenerController],
    providers: [
        UrlShortenerService,
        UrlIdentifierService,
        UrlsRepository,
        VisitsRepository,
        VisitsService,
    ],
})
export class UrlShortenerModule {}
