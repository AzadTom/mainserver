import { Injectable } from '@nestjs/common';
import { CreateAdminPanelDto } from './dto/create-admin-panel.dto';
import { UpdateAdminPanelDto } from './dto/update-admin-panel.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminPanelService {

  constructor(private readonly prisma:PrismaService){}

  async create(createAdminPanelDto: CreateAdminPanelDto) {
      const product = await this.prisma.product.create({
        data:createAdminPanelDto
      });

      return {
        status: 201,
        message: 'Product created successfully',
        data: product,
      };
  }

  async findAll() {
    const products = await this.prisma.product.findMany();
    return {
      status: 200,
      message: 'Products fetched successfully',
      data: products,
    }
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return {
      status: 200,
      message: 'Product fetched successfully',
      data: product,
    };
  }

  async update(id: string, updateAdminPanelDto: UpdateAdminPanelDto) {
    const product = await this.prisma.product.update({
      where: { id },
      data: updateAdminPanelDto,
    });
    return {
      status: 200,
      message: 'Product updated successfully',
      data: product,
    };
  }

  async remove(id: string) {
    const product = await this.prisma.product.delete({
      where: { id },
    });
    return {
      status: 200,
      message: 'Product deleted successfully',
      data: product,
    };  
  }
}
