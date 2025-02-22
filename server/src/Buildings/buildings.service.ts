import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buildings } from './buildings.entity';
import { BuildingsDto } from './dto/buildings.dto';

@Injectable()
export class BuildingsService {
  constructor (
    @InjectRepository(Buildings)
    private readonly DemoRepository: Repository<Buildings>,
  ) {}
  
  //getHello(): string {
  //  return 'Hello World!';
  //}

  findAll() {
    return this.DemoRepository.find()
  }

  createPost(body: BuildingsDto) {
    const post = this.DemoRepository.create(body)
    return this.DemoRepository.save(post)
    //return "hi";
  }

}
