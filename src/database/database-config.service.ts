import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('database.host');
  }

  get port(): number {
    return +this.configService.get<string>('database.port');
  }

  get name(): string {
    return this.configService.get<string>('database.name');
  }

  get username(): string {
    return this.configService.get<string>('database.username');
  }

  get password(): string {
    return this.configService.get<string>('database.password');
  }
}
