import { Module } from '@nestjs/common';
import { ReviewsController } from './controllers/review.controller';
import { ReviewsService } from './services/review.service';
import { MovieModule } from 'src/movies/movie.module';
import { ReviewRepository } from './repositories/rewiew.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity]),
    MovieModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewRepository]
})
export class ReviewModule {}
