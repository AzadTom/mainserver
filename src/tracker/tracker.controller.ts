import { Controller, Get,Param, Delete, Post, Body } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { PlaylistStatus } from './entities/trackerplaylist.entity';


@Controller('tracker')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Get()
  getAllListofPlaylists() {
    return this.trackerService.getAllListofPlaylists();
  }

  @Get(':id')
  getSinglePlaylist(@Param('id') id: string) {
    return this.trackerService.getSinglePlaylist(+id);
  }

  @Post(':id/status')
  updateStatusofSinglePlaylist(@Param('id') id: string, @Body('status') status: PlaylistStatus) {
    return this.trackerService.updateStatusofSinglePlaylist(+id, status);
  }

  @Delete(':id')
  removeRecordFromSinglePlaylist(@Param('id') id: string) {
    return this.trackerService.removeRecordFromSinglePlaylist(+id);
  }
}
