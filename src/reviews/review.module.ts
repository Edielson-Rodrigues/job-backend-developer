import { Module } from '@nestjs/common';
import { ReviewsController } from './controllers/review.controller';
import { CreateReviewService } from './services/create-review.service';
import { MovieModule } from 'src/movies/movie.module';
import { ReviewRepository } from './repositories/rewiew.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/review.entity';
import { DeleteReviewService } from './services/delete-review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity]),
    MovieModule
  ],
  controllers: [ReviewsController],
  providers: [
    CreateReviewService,
    DeleteReviewService,  
    ReviewRepository
  ]
})
export class ReviewModule {}
