import { Controller, Post, Body, Put, Param, Get, Delete } from '@nestjs/common';
import { AdsService } from './app.service';
import { CreateAdDto } from './app.dto';
import { Ad } from './app.entity';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  createAd(@Body() createAdDto: CreateAdDto): Promise<Ad> {
    return this.adsService.create(createAdDto);
  }

  @Put(':id')
  updateAd(@Param('id') id: number, @Body() updateAdDto: CreateAdDto): Promise<Ad> {
    return this.adsService.update(id, updateAdDto);
  }

  @Get(':id') // Endpoint to get a specific ad by ID
  getAd(@Param('id') id: number): Promise<Ad> {
    return this.adsService.findOne(id);
  }

  @Delete(':id') // Endpoint to delete a specific ad by ID
  deleteAd(@Param('id') id: number): Promise<void> {
    return this.adsService.delete(id);
  }
}
