import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseService implements OnModuleInit {
    constructor(@Inject('DB_CONNECTION') private pool: any) {}

    async query(query: string, params: any[]) {
        const { rows } = await this.pool.query(query, params);
        return rows;
    }

    private async runMigrations() {
        console.log('Running database migrations...');
        try {
            const migrationDir = path.join(
                __dirname,
                '..',
                '..',
                '..',
                'migrations',
            );
            const files = fs.readdirSync(migrationDir);

            for (const file of files) {
                const filePath = path.join(migrationDir, file);
                const sql = fs.readFileSync(filePath, 'utf-8');
                await this.pool.query(sql);
                console.log(`✅ Executed migration: ${file}`);
            }
        } catch (err) {
            console.log('❌ Migration Failed: ', err);
        }
    }

    async onModuleInit() {
        await this.runMigrations();
    }
}
