import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogsService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createBlogDto: CreateBlogDto) {
    const result = await this.prisma.blog.create({
      data: createBlogDto
    });

    return {
      data: result,
      message: 'Blog created successfully',
    };
  }

  async findAll() {
    const blogslist = await this.prisma.blog.findMany();

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
    const blog = await this.prisma.blog.findUnique({
      where: {
        id
      }
    });
    return {
      data: blog,
      message: 'Blog retrieved successfully',
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const blog = await this.prisma.blog.update({
      where: {
        id
      },
      data:updateBlogDto
    });
    return {
      data: blog,
      message: 'Blog updated successfully',
    }

  }

  async remove(id: string) {
    const blog = await this.prisma.blog.delete({
      where: {
        id
      }
    });
    return {
        data: blog,
        message: 'Blog removed successfully',
      };
    }
}
