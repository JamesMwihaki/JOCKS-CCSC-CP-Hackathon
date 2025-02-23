import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsDto } from './dto/rooms.dto';

@Controller('rooms')
export class RoomsContoller {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  getAll() {
    return this.roomsService.findAll();
  }

  @Post()
  createPost(@Body() body: RoomsDto) {
    return this.roomsService.createPost(body)
  }

}
