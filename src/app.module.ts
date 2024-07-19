import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from './database/database-config.module';
import { DatabaseConfigService } from './database/database-config.service';
import { Weather } from './models/weather.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
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
