import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';

@Module({
  imports:[TypeOrmModule.forFeature([User],'authConnection')],
  providers: [UserService],
  exports:[UserService],
})
export class UserModule {}
