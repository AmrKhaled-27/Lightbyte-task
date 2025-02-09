import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base-repo.repo';
import { DatabaseService } from '../database/database.service';

export type User = {
    id?: string;
    email: string;
    password: string;
};

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(protected readonly databaseService: DatabaseService) {
        super(databaseService, 'users');
    }

    async findByEmail(email: string): Promise<User> {
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await this.databaseService.query(query, [email]);
        return result[0];
    }
}
