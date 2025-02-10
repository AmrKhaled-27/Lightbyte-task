import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base-repo.repo';
import { DatabaseService } from '../../database/database.service';
import { UrlIdentifierService } from '../services/url-identifier-generation.service';
import { Url } from 'src/types/urls';

@Injectable()
export class UrlsRepository extends BaseRepository<Url> {
    constructor(
        protected readonly databaseService: DatabaseService,
        private readonly UrlIdentifierService: UrlIdentifierService,
    ) {
        super(databaseService, 'urls');
    }

    async create(data: Partial<Url>): Promise<Url> {
        const urlObject = {
            ...data,
            short_url: await this.UrlIdentifierService.generateIdentifier(),
        };
        return super.create(urlObject);
    }
    async findByUrlIdentifier(shortUrl: string): Promise<Url> {
        const query = `SELECT * FROM urls WHERE short_url = $1`;
        const result = await this.databaseService.query(query, [shortUrl]);
        return result[0];
    }
    async findByOriginalUrl(originalUrl: string): Promise<Url> {
        const query = `SELECT * FROM urls WHERE original_url = $1`;
        const result = await this.databaseService.query(query, [originalUrl]);
        return result[0];
    }
}
