import { Module } from '@nestjs/common';
import { ReviewController } from './controllers/review.controller';
import { CreateReviewService } from './services/create-review.service';
import { MovieModule } from '../movies/movie.module';
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
  controllers: [ReviewController],
  providers: [
    CreateReviewService,
    UpdateReviewService,
    GetReviewService,
    DeleteReviewService,  
    {
      provide: 'IReviewRepository',
      useClass: ReviewRepository
    }
  ]
})
export class ReviewModule {}
