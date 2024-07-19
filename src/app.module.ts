import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from './database/database-config.module';
import { DatabaseConfigService } from './database/database-config.service';
import { Weather } from './models/weather/weather.entity';
import { WeatherModule } from './models/weather/weather.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule, HttpModule, WeatherModule, ApiModule],
      useFactory: (databaseConfigService: DatabaseConfigService) => {
        return {
          type: 'postgres',
          host: databaseConfigService.host,
          port: +databaseConfigService.port,
          username: databaseConfigService.username,
          password: databaseConfigService.password,
          database: databaseConfigService.name,
          entities: [Weather],
          synchronize: true,
        };
      },
      inject: [DatabaseConfigService],
    }),
    TypeOrmModule.forFeature([Weather]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
