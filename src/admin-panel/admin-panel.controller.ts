import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { CreateAdminPanelDto } from './dto/create-admin-panel.dto';
import { UpdateAdminPanelDto } from './dto/update-admin-panel.dto';

@Controller('admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  @Post()
  create(@Body() createAdminPanelDto: CreateAdminPanelDto) {
    return this.adminPanelService.create(createAdminPanelDto);
  }

  @Get()
  findAll() {
    return this.adminPanelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminPanelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminPanelDto: UpdateAdminPanelDto) {
    return this.adminPanelService.update(id, updateAdminPanelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminPanelService.remove(id);
  }
}
