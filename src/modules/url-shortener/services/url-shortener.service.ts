import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlsRepository } from '../repositories/urls.repository';
import { Url } from 'src/types/urls';
@Injectable()
export class UrlShortenerService {
    constructor(private readonly urlsRepository: UrlsRepository) {}
    async shortenUrl(url: string, userId: number): Promise<string> {
        const existingUrl = await this.urlsRepository.findByOriginalUrl(url);

        if (existingUrl) {
            return existingUrl?.short_url;
        }

        const urlObject = await this.urlsRepository.create({
            original_url: url,
            user_id: userId,
        });

        return urlObject.short_url;
    }

    async resolveUrl(urlIdentifier: string): Promise<Url | null> {
        const urlObject =
            await this.urlsRepository.findByUrlIdentifier(urlIdentifier);
        if (!urlObject) {
            throw new NotFoundException('URL not found');
        }
        return urlObject;
    }
}
