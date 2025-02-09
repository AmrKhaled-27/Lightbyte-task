import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import { DatabaseService } from './database.service';
@Global()
@Module({
    providers: [
        {
            provide: 'DB_CONNECTION',
            useFactory: async () => {
                return new Pool({
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT),
                    user: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                });
            },
        },
        DatabaseService,
    ],
    exports: ['DB_CONNECTION', DatabaseService],
})
export class DatabaseModule {}
