import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseBootstrapService implements OnApplicationBootstrap {
  constructor(
    @InjectDataSource()
    private readonly mainDataSource: DataSource,
    @InjectDataSource('authConnection')
    private readonly authDataSource: DataSource,
  ) {}

  async onApplicationBootstrap() {
    if (this.mainDataSource.isInitialized) {
      await this.onMainDatabaseConnected();
    }

    if (this.authDataSource.isInitialized) {
      await this.onAuthDatabaseConnected();
    }
  }

  private async onMainDatabaseConnected() {
    console.log('Main database connected');
  }

  private async onAuthDatabaseConnected() {
    console.log('Auth database connected');
  }
}
