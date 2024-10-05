import { Body, Controller, Post } from '@nestjs/common';
import { ReviewsService } from '../services/review.service';
import { CreateReviewDTO } from '../dtos/create-review.dto';

@Controller('/movie-reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}
  
  @Post("")
  public async create(@Body() review: CreateReviewDTO): Promise<any> {
    return this.reviewsService.create(review);
  }
}
