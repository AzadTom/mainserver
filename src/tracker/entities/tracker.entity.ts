import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trackers')
export class Tracker {
  @PrimaryGeneratedColumn({name:'id',type:'integer'})
  id: number;

  @Column({ name:'title',type:'text'})
  title: string;

  @Column({name:'description',type:'text'})
  description: string;
  
  @Column({name:'imageUrl',type:'text'})
  imageUrl: string;
}
