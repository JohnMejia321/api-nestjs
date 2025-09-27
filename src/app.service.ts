import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseSeeder } from './seeders/database.seeder';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly databaseSeeder: DatabaseSeeder) {}

  async onModuleInit() {
    await this.databaseSeeder.seed();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
