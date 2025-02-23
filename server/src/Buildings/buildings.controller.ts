import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

    // returns the description of one building
    @Get()
    getBuildingDescription(@Query('buildingName') buildingName: string) {
      //return buildingName;
      return this.buildingsService.getBuildingDescription(buildingName)
    }

  @Post()
  createPost(@Body() body: BuildingsDto) {
    return this.buildingsService.createPost(body)
  }
}
