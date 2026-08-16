import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { TenantModule } from './tenant/tenant.module';
import { TrackerModule } from './tracker/tracker.module';
import { RedisModule } from './redis/redis.module';
import { BlogsModule } from './blogs/blogs.module';
import { CloudinaryModule } from './cloudnary/cloudnary.module';
import { UploadModule } from './upload/upload.module';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './prisma/prisma.module';
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
          type: 'postgres',
          url: config.get<string>('DATABASE_URL'),
          autoLoadEntities: true,
          synchronize: false,
          logging: !isProd,
          ssl: isProd ? { rejectUnauthorized: false } : false,
        };
      },
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
    }),
    AuthModule,
    UserModule,
    MailModule,
    TenantModule,
    TrackerModule,
    RedisModule,
    BlogsModule,
    CloudinaryModule,
    UploadModule,
    TodosModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
