import { Body, Controller, Post } from '@nestjs/common';
import { CreateReviewService } from '../services/create-review.service';
import { CreateReviewDTO, CreateReviewResponseDTO } from '../dtos/create-review.dto';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/movie-reviews')
@ApiTags('Movie Reviews')
export class ReviewsController {
  constructor(
    private readonly createReviewService: CreateReviewService,
  ) {}
  
  @Post("")
  @ApiResponse({
    description: 'Review created successfully',
    type: CreateReviewResponseDTO
  })
  @ApiNotFoundResponse({
    description: 'Movie not found',
    example: {
      message: "Movie not found",
      data: {
        similarMovies: [
          "Harry Potter and the Deathly Hallows Part 1 (2010) and Part 2 (2011) Featuring Brizzy Voices",
          "Harry Potter and the Deathly Hallows Part 1 (2010)"
        ]
      }
    }
  })
  public async create(@Body() review: CreateReviewDTO) {
    return await this.createReviewService.execute(review);
  }
}
