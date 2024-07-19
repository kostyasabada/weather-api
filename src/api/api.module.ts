import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherModule } from 'src/models/weather/weather.module';

@Module({
  imports: [WeatherModule],
  providers: [],
  controllers: [WeatherController],
  exports: [],
})
export class ApiModule {}
