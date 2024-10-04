import { Module } from '@nestjs/common';
import { ReviewsController } from './controllers/review.controller';
import { ReviewsService } from './services/review.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService]
})
export class ReviewsModule {}
