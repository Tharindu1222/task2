import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: number, updateAdDto: CreateAdDto): Promise<Ad> {
    const ad = await this.adsRepository.findOneBy({ id });
    if (!ad) {
      throw new NotFoundException(`Ad with ID ${id} not found`);
    }
    Object.assign(ad, updateAdDto); // Update ad properties
    return this.adsRepository.save(ad); // Save the updated ad
  }

  async findOne(id: number): Promise<Ad> {
    const ad = await this.adsRepository.findOneBy({ id });
    if (!ad) {
      throw new NotFoundException(`Ad with ID ${id} not found`);
    }
    return ad;
  }
}
