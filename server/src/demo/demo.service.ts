import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demo } from './demo.entity';
import { DemoDto } from './dto/demo.dto';

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

  createPost(body: DemoDto) {
    const post = this.DemoRepository.create(body)
    return this.DemoRepository.save(post)
    //return "hi";
  }

}
