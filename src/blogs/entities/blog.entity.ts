import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


enum BlogStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity("blogs")
export class Blog {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'title'} )
    title: string;

    @Column({ unique: true,name: 'slug' })
    slug: string;

    @Column({name: 'excerpt'})
    excerpt: string;

    @Column({ type: 'jsonb',name: 'content' })
    content: Record<string, any>;

    @Column({
        type: 'enum',
        enum: BlogStatus,
        default: BlogStatus.DRAFT,
        name: 'status',
    })
    status: BlogStatus;


    @Column({ type: 'timestamp', nullable: true,name: 'published_at' })
    publishedAt: Date;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}
