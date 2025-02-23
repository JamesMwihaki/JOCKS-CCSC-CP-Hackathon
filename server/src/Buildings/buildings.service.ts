import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buildings } from './buildings.entity';
import { BuildingsDto } from './dto/buildings.dto';

@Injectable()
export class BuildingsService {
  constructor (
    @InjectRepository(Buildings)
    private readonly buildingsRepository: Repository<Buildings>,
  ) {}

  findAll() {
    return this.buildingsRepository.find()
  }

  getBuildings() {
    return this.buildingsRepository.find({ select: ['buildings_locations'] })
  }

  getBuildingDescription(buildingName: string) {
    return this.buildingsRepository.find({ select: ['description'], where: {buildings_locations: buildingName }})
  }

  createPost(body: BuildingsDto) {
    const post = this.buildingsRepository.create(body)
    return this.buildingsRepository.save(post)
  }

}
