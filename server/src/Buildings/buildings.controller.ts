import { Body, Controller, Get, Post } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsDto } from './dto/buildings.dto';

@Controller()
export class BuildingsController {
  constructor(private readonly demoService: BuildingsService) {}

  @Get()
  getAll() {
    //return this.appService.getHello();
    return this.demoService.findAll();
  }

  @Post()
  createPost(@Body() body: BuildingsDto) {
    return this.demoService.createPost(body)
  }

}
