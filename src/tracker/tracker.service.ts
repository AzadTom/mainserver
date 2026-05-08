import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tracker } from './entities/tracker.entity';
import { PlaylistStatus, TrackerPlaylist } from './entities/trackerplaylist.entity';
import { Redis } from 'ioredis';

@Injectable()
export class TrackerService {
  private readonly allPlaylistsCacheKey = 'tracker:playlists:all';
  private readonly singlePlaylistCachePrefix = 'tracker:playlist:';
  private readonly cacheTtlSeconds = 300;

  constructor(
    @InjectRepository(Tracker) private repo: Repository<Tracker>,
    @InjectRepository(TrackerPlaylist) private playlistRepo: Repository<TrackerPlaylist>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async getAllListofPlaylists() {
    const cachedList = await this.getCachedValue<Tracker[]>(
      this.allPlaylistsCacheKey,
    );

    if (cachedList) {
      return {
        data: cachedList,
        cached: true,
      };
    }

    const list = await this.repo.find({order:{id:'ASC'}});
    await this.setCachedValue(this.allPlaylistsCacheKey, list);

    return {
      data: list,
      cached: false,
    };
  }

  async getSinglePlaylist(id: number) {
    const cacheKey = this.getSinglePlaylistCacheKey(id);
    const cachedPlaylist = await this.getCachedValue<TrackerPlaylist[]>(cacheKey);

    if (cachedPlaylist) {
      return {
        data: cachedPlaylist,
        cached: true,
      };
    }

    const playlist = await this.playlistRepo.find({ where: { playlistid: id },order:{id:'ASC'}});
    await this.setCachedValue(cacheKey, playlist);

    return {
      data: playlist,
      cached: false,
    }
  }

  async removeRecordFromSinglePlaylist(id: number) {
    const isDataExist = await this.playlistRepo.findOne({ where: { id: id } });
    if (isDataExist) {
      await this.playlistRepo.delete({ id: id });
      await this.invalidatePlaylistCache(id);
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
      await this.invalidatePlaylistCache(id);
      return {
        message: 'Status updated successfully',
      }
    }
  }

  private getSinglePlaylistCacheKey(id: number) {
    return `${this.singlePlaylistCachePrefix}${id}`;
  }

  private async getCachedValue<T>(key: string): Promise<T | null> {
    try {
      const cached = await this.redisClient.get(key);

      if (!cached) {
        return null;
      }

      return JSON.parse(cached) as T;
    } catch {
      return null;
    }
  }

  private async setCachedValue(key: string, value: unknown) {
    try {
      await this.redisClient.set(
        key,
        JSON.stringify(value),
        'EX',
        this.cacheTtlSeconds,
      );
    } catch {
      // Cache failures should not block the DB response path.
    }
  }

  private async invalidatePlaylistCache(id: number) {
    try {
      await this.redisClient.del(
        this.allPlaylistsCacheKey,
        this.getSinglePlaylistCacheKey(id),
      );
    } catch {
      // Cache invalidation is best-effort.
    }
  }
}
