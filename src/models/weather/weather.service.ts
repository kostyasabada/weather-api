import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weather } from './weather.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CurrentWeather } from './weather-data.interface';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
    private readonly httpService: HttpService,
  ) {}

  async fetchWeatherData(
    lat: string,
    lon: string,
    part: string = '',
  ): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(process.env.WEATHER_URL, {
          params: {
            lat,
            lon,
            part,
            appid: process.env.WEATHER_API_ID,
          },
        }),
      );

      const weather = new Weather();
      weather.lat = lat;
      weather.lon = lon;
      weather.part = part;
      weather.weather = JSON.stringify(response.data);
      await this.weatherRepository.save(weather);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.code, error.message);
    }
  }

  async getWeatherData(
    lat: string,
    lon: string,
    part: string = '',
  ): Promise<CurrentWeather> {
    try {
      const weatherData = await this.weatherRepository.findOne({
        where: { lat, lon, part },
      });

      if (!weatherData) {
        throw new HttpException('Weather data not found', 404);
      }

      return JSON.parse(weatherData.weather);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
