import {
  Controller,
  Query,
  Post,
  HttpException,
  HttpStatus,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherFormatInterceptor } from 'src/interceptors/weather.interceptor';
import { CurrentWeather } from 'src/models/weather/weather-data.interface';
import { WeatherService } from 'src/models/weather/weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async postWeather(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('part') part: string,
  ): Promise<void> {
    if (!lat || !lon) {
      throw new HttpException('ParameterNotProvided', HttpStatus.BAD_REQUEST);
    }

    await this.weatherService.fetchWeatherData(lat, lon, part);
  }

  @Get()
  @UseInterceptors(WeatherFormatInterceptor)
  async getWeather(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('part') part: string,
  ): Promise<CurrentWeather> {
    return await this.weatherService.getWeatherData(lat, lon, part);
  }
}
