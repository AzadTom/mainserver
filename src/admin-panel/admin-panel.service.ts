import { Injectable } from '@nestjs/common';
import { CreateAdminPanelDto } from './dto/create-admin-panel.dto';
import { UpdateAdminPanelDto } from './dto/update-admin-panel.dto';
import { PrismaService } from '../prisma/prisma.service';
import type { Product } from '../../generated/prisma/client';

export type AdminPanelResponse<T> = {
  status: number;
  message: string;
  data: T;
};

@Injectable()
export class AdminPanelService {

  constructor(private readonly prisma: PrismaService) {}
  async create(
    createAdminPanelDto: CreateAdminPanelDto,
  ): Promise<AdminPanelResponse<Product>> {
    const product = await this.prisma.product.create({
      data: createAdminPanelDto
    });

    return {
      status: 201,
      message: 'Product created successfully',
      data: product,
    };
  }

  async findAll(): Promise<AdminPanelResponse<Product[]>> {
    const products = await this.prisma.product.findMany();
    return {
      status: 200,
      message: 'Products fetched successfully',
      data: products,
    }
  }

  async findOne(id: string): Promise<AdminPanelResponse<Product | null>> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return {
      status: 200,
      message: 'Product fetched successfully',
      data: product,
    };
  }

  async update(
    id: string,
    _updateAdminPanelDto: UpdateAdminPanelDto,
  ): Promise<AdminPanelResponse<Product>> {
    const product = await this.prisma.product.update({
      where: { id },
      data: _updateAdminPanelDto,
    });
    return {
      status: 200,
      message: 'Product updated successfully',
      data: product,
    };
  }

  async remove(id: string): Promise<AdminPanelResponse<Product>> {
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
