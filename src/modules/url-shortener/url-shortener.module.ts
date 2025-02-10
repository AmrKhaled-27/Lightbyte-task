import { Module } from '@nestjs/common';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './url-shortener.service';
import { UrlIdentifierService } from './url-identifier-generation.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UrlsRepository } from './urls.repository';
import { UserRepository } from '../auth/user.repository';

@Module({
    imports: [AuthModule],
    controllers: [UrlShortenerController],
    providers: [UrlShortenerService, UrlIdentifierService, UrlsRepository],
})
export class UrlShortenerModule {}
