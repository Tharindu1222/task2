import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsController } from './app.controller.spec';
import { AdsService } from './app.service';
import { Ad } from './app.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // or 'mariadb'
      host: 'localhost', // or your database host
      port: 3306, // default MySQL port
      username: 'root',
      password: '',
      database: 'toyota',
      entities: [Ad],
      synchronize: true, // Use with caution, only in development
      logging: true, // Enable logging to see SQL queries

    }),
    TypeOrmModule.forFeature([Ad]),
  ],
  controllers: [AdsController], // Include the AdsController here
  providers: [AdsService],
})
export class AppModule {}
