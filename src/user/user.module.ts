import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule, TypeOrmModule.forFeature([User],'authConnection')],
  providers: [UserService],
  exports:[UserService],
})
export class UserModule {}
