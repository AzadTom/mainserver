import { Injectable, Inject } from '@nestjs/common';
import { Tracker } from './entities/tracker.entity';
import { PlaylistStatus, TrackerPlaylist } from './entities/trackerplaylist.entity';
import { Redis } from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackerService {
  private readonly allPlaylistsCacheKey = 'tracker:playlists:all';
  private readonly singlePlaylistCachePrefix = 'tracker:playlist:';
  private readonly cacheTtlSeconds = 300;

  constructor(private readonly prisma: PrismaService, @Inject('REDIS_CLIENT') private readonly redisClient: Redis) { }

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

    const list = await this.prisma.tracker.findMany({ orderBy: { id: 'desc' } });
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

    const playlist = await this.prisma.trackerPlaylist.findMany({ where: { playlistid: id }, orderBy: { id: 'desc' } });
    await this.setCachedValue(cacheKey, playlist);

    return {
      data: playlist,
      cached: false,
    }
  }

  async getAllPlaylistVideo() {
    const cachedPlaylist = await this.getCachedValue<TrackerPlaylist[]>('allplaylist');
    if (cachedPlaylist) {
      return {
        data: cachedPlaylist,
        cached: true,
      };
    }
    const allresults = await this.prisma.trackerPlaylist.findMany({ orderBy: { id: 'desc' } });
    await this.setCachedValue('allplaylist', allresults);
    return {
      data: allresults,
      cached: false,
    }

  }

  async removeRecordFromSinglePlaylist(id: number) {
    const isDataExist = await this.prisma.trackerPlaylist.findUnique({ where: { id: id } });
    if (isDataExist) {
      await this.prisma.trackerPlaylist.delete({ where: { id: id } });
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
    const isDataExist = await this.prisma.trackerPlaylist.findUnique({ where: { id: id } });
    if (isDataExist) {
      await this.prisma.trackerPlaylist.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
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
