import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsDto } from './dto/rooms.dto';

@Controller()
export class RoomsContoller {
  constructor(private readonly demoService: RoomsService) {}

  @Get()
  getAll() {
    //return this.appService.getHello();
    return this.demoService.findAll();
  }

  @Post()
  createPost(@Body() body: RoomsDto) {
    return this.demoService.createPost(body)
  }

}
