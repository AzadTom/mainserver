enum BlogStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export class CreateBlogDto {
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, any>;
  status?: BlogStatus;
  publishedAt?: Date;
}