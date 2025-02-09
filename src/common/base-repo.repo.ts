import { DatabaseService } from 'src/modules/database/database.service';

export abstract class BaseRepository<T> {
    constructor(
        protected readonly databaseService: DatabaseService,
        private readonly tableName: string,
    ) {}

    async create(data: Partial<T>): Promise<T> {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
        const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
        const result = await this.databaseService.query(query, values);
        return result[0];
    }
}
