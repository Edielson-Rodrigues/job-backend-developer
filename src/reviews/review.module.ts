import { Module } from '@nestjs/common';
import { ReviewsController } from './controllers/review.controller';
import { CreateReviewService } from './services/create-review.service';
import { MovieModule } from 'src/movies/movie.module';
import { ReviewRepository } from './repositories/rewiew.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/review.entity';
import { DeleteReviewService } from './services/delete-review.service';
import { UpdateReviewService } from './services/update-review.service';
import { GetReviewService } from './services/get-review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity]),
    MovieModule
  ],
  controllers: [ReviewsController],
  providers: [
    CreateReviewService,
    UpdateReviewService,
    GetReviewService,
    DeleteReviewService,  
    ReviewRepository
  ]
})
export class ReviewModule {}
