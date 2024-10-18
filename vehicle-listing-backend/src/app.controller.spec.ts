import { Controller, Post, Body } from '@nestjs/common';
import { AdsService } from './app.service'
import { CreateAdDto } from './app.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  createAd(@Body() createAdDto: CreateAdDto) {
    return this.adsService.create(createAdDto);
  }
}