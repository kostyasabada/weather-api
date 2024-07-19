import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './weather.entity';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Weather]), HttpModule],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
