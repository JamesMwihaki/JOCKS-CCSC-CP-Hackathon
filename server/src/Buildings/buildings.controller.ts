import { Body, Controller, Get, Post } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsDto } from './dto/buildings.dto';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get('/all')
  getAll() {
    return this.buildingsService.findAll();
  }

  @Get('/buildings')
  getBuildings() {
    return this.buildingsService.getBuildings()
  }

  @Post()
  createPost(@Body() body: BuildingsDto) {
    return this.buildingsService.createPost(body)
  }
}
