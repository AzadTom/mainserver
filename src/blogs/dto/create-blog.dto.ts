enum BlogStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export class CreateBlogDto {
  title!: string;
  slug!: string;
  excerpt!: string;
  content!: Record<string, any>;
  status?: BlogStatus;
  publishedAt?: Date;
}