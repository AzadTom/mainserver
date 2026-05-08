import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');
        if (redisUrl) {
          return new Redis(redisUrl);
        }

        const host = configService.get<string>('REDIS_HOST', 'localhost');
        const port = Number(configService.get<string>('REDIS_PORT', '6379'));
        const password = configService.get<string>('REDIS_PASSWORD');
        const db = Number(configService.get<string>('REDIS_DB', '0'));

        return new Redis({
          host,
          port,
          password,
          db,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
