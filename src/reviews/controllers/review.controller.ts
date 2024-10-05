import { Body, Controller, Post } from '@nestjs/common';
import { CreateReviewService } from '../services/create-review.service';
import { CreateReviewDTO } from '../dtos/create-review.dto';

@Controller('/movie-reviews')
export class ReviewsController {
  constructor(
    private readonly createReviewService: CreateReviewService,
  ) {}
  
  @Post("")
  public async create(@Body() review: CreateReviewDTO): Promise<any> {
    return await this.createReviewService.execute(review);
  }
}
