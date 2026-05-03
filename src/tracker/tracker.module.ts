import { Module } from '@nestjs/common';
import { Tracker } from './entities/tracker.entity';
import { TrackerPlaylist } from './entities/trackerplaylist.entity';
import { TrackerController } from './tracker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackerService } from './tracker.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tracker, TrackerPlaylist])],
  controllers: [TrackerController],
  providers: [TrackerService],
})
export class TrackerModule {}
