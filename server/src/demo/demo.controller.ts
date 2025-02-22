import { Controller, Get } from '@nestjs/common';
import { DemoService } from './demo.service';

@Controller()
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  getAll() {
    //return this.appService.getHello();
    return this.demoService.findAll();
  }
}
