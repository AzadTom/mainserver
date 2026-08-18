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
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
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
