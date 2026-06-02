import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {

  constructor(@InjectRepository(Blog) private readonly blogRepository: Repository<Blog>) { }

  async create(createBlogDto: CreateBlogDto) {
    const blog = this.blogRepository.create(createBlogDto);
    const result = await this.blogRepository.save(blog);
    return {
      data: result,
      message: 'Blog created successfully',
    };
  }

  async findAll() {
    const blogslist = await this.blogRepository.find();

    if (blogslist.length === 0) {
      return {
        data: [],
        message: 'No blogs found',
      }
    }

    return {
      data: blogslist,
      message: 'Blogs retrieved successfully',
    }
  }

  async findOne(id: string) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    return {
      data: blog,
      message: 'Blog retrieved successfully',
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (blog) {
      Object.assign(blog, updateBlogDto);
      const result = await this.blogRepository.save(blog);
      return {
        data: result,
        message: 'Blog updated successfully',
      };
    }

  }

  async remove(id: string) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (blog) {
      const result = await this.blogRepository.remove(blog);
      return {
        data: result,
        message: 'Blog removed successfully',
      };
    }
  }
}
