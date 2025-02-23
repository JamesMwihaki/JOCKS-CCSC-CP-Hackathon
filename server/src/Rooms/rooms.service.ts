import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from './rooms.entity';
import { RoomsDto } from './dto/rooms.dto';

@Injectable()
export class RoomsService {
  constructor (
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
  ) {}

  findAll() {
    return this.roomsRepository.find()
  }

  createPost(body: RoomsDto) {
    const post = this.roomsRepository.create(body)
    return this.roomsRepository.save(post)
  }

}
