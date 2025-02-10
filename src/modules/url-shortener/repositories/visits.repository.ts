import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base-repo.repo';
import { DatabaseService } from '../../database/database.service';
import { Visit, VisitStats } from 'src/types/visits';

@Injectable()
export class VisitsRepository extends BaseRepository<Visit> {
    constructor(protected readonly databaseService: DatabaseService) {
        super(databaseService, 'visits');
    }

    async visitsStats(userId: number): Promise<VisitStats[]> {
        const query = `
            SELECT urls.original_url,urls.short_url, COUNT(visits.id) as visits_count
            FROM urls
            LEFT JOIN visits on urls.id = visits.url_id
            WHERE urls.user_id = $1
            GROUP BY urls.id`;
        return await this.databaseService.query(query, [userId]);
    }
}
