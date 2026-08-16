import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const isProd = config.get('NODE_ENV') === 'production';
                return {
                    name: 'authConnection',
                    type: 'postgres',
                    url: config.get<string>('AUTH_DATABASE_URL'),
                    autoLoadEntities: true,
                    synchronize: false,
                    logging: !isProd,
                    ssl: isProd
                        ? { rejectUnauthorized: false }
                        : false,
                }
            }
        })
    ]
})
export class AuthdbModule { }
