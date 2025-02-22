import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demo } from './demo.entity';

@Injectable()
export class DemoService {
  constructor (
    @InjectRepository(Demo)
    private readonly DemoRepository: Repository<Demo>,
  ) {}
  
  //getHello(): string {
  //  return 'Hello World!';
  //}

  findAll() {
    return this.DemoRepository.find()
  }

}
