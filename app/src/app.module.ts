import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthController } from './controllers/health.controller';

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGO_HOST,
      port: Number(process.env.MONGO_PORT),
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      database: process.env.MONGO_DATABASE,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
