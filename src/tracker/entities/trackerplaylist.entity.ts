import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tracker } from './tracker.entity';

export enum PlaylistStatus {
  IDLE = 'idle',
  INPROGRESS = 'inprogress',
  DONE = 'done',
}

@Entity('trackersplaylist')
export class TrackerPlaylist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  playlistid: number;

  @Column({ type: 'text', name: 'youtube_iframe_url' })
  youtubeIframeUrl: string;

  @Column({
    type: 'enum',
    enum: PlaylistStatus,
    default: PlaylistStatus.IDLE,
  })
  status: PlaylistStatus;

  @ManyToOne(() => Tracker, (tracker) => tracker.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'playlistid' })
  tracker: Tracker;
}