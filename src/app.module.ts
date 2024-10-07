import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './infra/config/typeorm.config';
import { MovieModule } from './movies/movie.module';
import { ReviewModule } from './reviews/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(TypeORMConfig),
    ReviewModule,
    MovieModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
