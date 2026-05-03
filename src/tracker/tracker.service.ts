import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tracker } from './entities/tracker.entity';
import { TrackerPlaylist } from './entities/trackerplaylist.entity';

@Injectable()
export class TrackerService {

  constructor(@InjectRepository(Tracker) private repo: Repository<Tracker>,@InjectRepository(TrackerPlaylist) private playlistRepo: Repository<TrackerPlaylist>) {}

  async findAll() {
    const list = await this.repo.find();
    return {
      data: list,
    };
  }

  async findOne(id: number) {
    const playlist = await this.playlistRepo.find({where:{playlistid:id}});
    return{
      data: playlist,
    }
  }

  async remove(id: number) {
    const isDataExist  = await this.playlistRepo.find({where:{id:id}});
      if(isDataExist.length > 0){
        await this.playlistRepo.delete({id:id});
        return {
          message: 'Data deleted successfully',
        }
      } else{
        return {
          message: 'Data not found',
        }
      }
  }
}
