import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        sunrise: data.current.sunrise,
        sunset: data.current.sunset,
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        pressure: data.current.pressure,
        humidity: data.current.humidity,
        uvi: data.current.uvi,
        wind_speed: data.current.wind_speed,
      })),
    );
  }
}
