import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tracker } from './entities/tracker.entity';
import { PlaylistStatus, TrackerPlaylist } from './entities/trackerplaylist.entity';
// import { Redis } from 'ioredis';

@Injectable()
export class TrackerService {

  constructor(
    @InjectRepository(Tracker) private repo: Repository<Tracker>,
    @InjectRepository(TrackerPlaylist) private playlistRepo: Repository<TrackerPlaylist>,
    // @Inject('REDIS_CLIENT') private readonly redisClient: Redis
  ) { }

  async getAllListofPlaylists() {
    const list = await this.repo.find();
    return {
      data: list,
    };
  }

  async getSinglePlaylist(id: number) {
    const playlist = await this.playlistRepo.find({ where: { playlistid: id } });
    return {
      data: playlist,
    }
  }

  async removeRecordFromSinglePlaylist(id: number) {
    const isDataExist = await this.playlistRepo.findOne({ where: { id: id } });
    if (isDataExist) {
      await this.playlistRepo.delete({ id: id });
      return {
        message: 'Data deleted successfully',
      }
    } else {
      return {
        message: 'Data not found',
      }
    }
  }

  async updateStatusofSinglePlaylist(id: number, status: PlaylistStatus) {
    const isDataExist = await this.playlistRepo.findOne({ where: { id: id } });
    if (isDataExist) {
      await this.playlistRepo.update({ id: id }, { status: status });
      return {
        message: 'Status updated successfully',
      }
    }
  }
}
