import { Injectable } from '@nestjs/common';
import { VisitsRepository } from '../repositories/visits.repository';
import { VisitStats } from 'src/types/visits';

@Injectable()
export class VisitsService {
    constructor(private readonly visitsRepository: VisitsRepository) {}

    async createVisit(urlId: number, ipAddress: string, userAgent: string) {
        await this.visitsRepository.create({
            url_id: urlId,
            ip_address: ipAddress,
            user_agent: userAgent,
        });
    }
    async visitsStats(userId: number, baseUrl: string) {
        const stats = await this.visitsRepository.visitsStats(userId);
        stats.forEach((stat: VisitStats) => {
            stat.short_url = `${baseUrl}/${stat.short_url}`;
        });
        return stats;
    }
}
