import { Injectable } from '@nestjs/common';
import { VisitsRepository } from '../repositories/visits.repository';

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
    async visitsStats(userId: number) {
        return await this.visitsRepository.visitsStats(userId);
    }
}
