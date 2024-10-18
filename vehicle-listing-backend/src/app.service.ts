import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ad } from './app.entity';
import { CreateAdDto } from './app.dto';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad)
    private readonly adsRepository: Repository<Ad>,
  ) {}

  create(createAdDto: CreateAdDto) {
    const ad = this.adsRepository.create(createAdDto);
    return this.adsRepository.save(ad);
  }
}