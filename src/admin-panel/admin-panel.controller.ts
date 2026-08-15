import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminPanelService, type AdminPanelResponse } from './admin-panel.service';
import { CreateAdminPanelDto } from './dto/create-admin-panel.dto';
import { UpdateAdminPanelDto } from './dto/update-admin-panel.dto';
import type { Product } from '../../generated/prisma/client';

@Controller('admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  @Post()
  create(
    @Body() createAdminPanelDto: CreateAdminPanelDto,
  ): Promise<AdminPanelResponse<Product>> {
    return this.adminPanelService.create(createAdminPanelDto);
  }

  @Get()
  findAll(): Promise<AdminPanelResponse<Product[]>> {
    return this.adminPanelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AdminPanelResponse<Product | null>> {
    return this.adminPanelService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminPanelDto: UpdateAdminPanelDto,
  ): Promise<AdminPanelResponse<Product>> {
    return this.adminPanelService.update(id, updateAdminPanelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<AdminPanelResponse<Product>> {
    return this.adminPanelService.remove(id);
  }
}
