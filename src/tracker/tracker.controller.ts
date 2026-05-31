import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { PlaylistStatus } from './entities/trackerplaylist.entity';


@Controller('tracker')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Get()
  getAllListofPlaylists() {
    return this.trackerService.getAllListofPlaylists();
  }

  @Get('all')
  getAllPlaylistVideo(){
    return this.trackerService.getAllPlaylistVideo();
  }
  
  @Get(':id')
  getSinglePlaylist(@Param('id', ParseIntPipe) id: number) {
    return this.trackerService.getSinglePlaylist(id);
  }

  @Post(':id/status')
  updateStatusofSinglePlaylist(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: PlaylistStatus,
  ) {
    return this.trackerService.updateStatusofSinglePlaylist(id, status);
  }

  @Delete(':id')
  removeRecordFromSinglePlaylist(@Param('id', ParseIntPipe) id: number) {
    return this.trackerService.removeRecordFromSinglePlaylist(id);
  }
}
