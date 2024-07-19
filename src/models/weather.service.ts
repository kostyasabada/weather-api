import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weather } from './weather.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
  ) {}

  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  // findOne(id: number): Promise<User> {
  //   return this.usersRepository.findOne({ where: { id } });
  // }

  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
