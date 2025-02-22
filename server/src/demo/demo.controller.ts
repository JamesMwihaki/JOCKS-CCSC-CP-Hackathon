import { Body, Controller, Get, Post } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoDto } from './dto/demo.dto';

@Controller()
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  getAll() {
    //return this.appService.getHello();
    return this.demoService.findAll();
  }

  @Post()
  createPost(@Body() body: DemoDto) {
    return this.demoService.createPost(body)
  }

}
