import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from './rooms.entity';
import { RoomsDto } from './dto/rooms.dto';

@Injectable()
export class RoomsService {
  constructor (
    @InjectRepository(Rooms)
    private readonly DemoRepository: Repository<Rooms>,
  ) {}

  findAll() {
    return this.DemoRepository.find()
  }

  createPost(body: RoomsDto) {
    const post = this.DemoRepository.create(body)
    return this.DemoRepository.save(post)
  }

}
