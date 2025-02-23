import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsDto } from './dto/rooms.dto';

@Controller('rooms')
export class RoomsContoller {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  getAll() {
    return this.roomsService.findAll();
  }

  // returns all the rooms in a building
  @Get(':buildingName')
  getRooms(@Param('buildingName') buildingName:string) {
    return this.roomsService.getRooms(buildingName);
  }

  @Post()
  createPost(@Body() body: RoomsDto) {
    return this.roomsService.createPost(body)
  }

}
