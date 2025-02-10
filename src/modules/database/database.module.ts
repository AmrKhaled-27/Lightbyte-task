import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { DatabaseService } from './database.service';

@Global()
@Module({
    providers: [
        {
            provide: 'DB_CONNECTION',
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return new Pool({
                    host: configService.get<string>('DB_HOST'),
                    port: configService.get<number>('DB_PORT'),
                    user: configService.get<string>('DB_USERNAME'),
                    password: configService.get<string>('DB_PASSWORD'),
                    database: configService.get<string>('DB_NAME'),
                });
            },
        },
        DatabaseService,
    ],
    exports: ['DB_CONNECTION', DatabaseService],
})
export class DatabaseModule {}
