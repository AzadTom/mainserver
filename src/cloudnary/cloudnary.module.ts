import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './cloudnary.provider';
import { CloudinaryService } from './cloudnary.service';

@Module({
  imports: [ConfigModule],
  providers: [
    CloudinaryProvider,
    CloudinaryService,
  ],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
