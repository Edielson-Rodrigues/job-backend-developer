import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateReviewService } from '../services/create-review.service';
import { CreateReviewDTO, CreateReviewResponseDTO } from '../dtos/create-review.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeleteReviewService } from '../services/delete-review.service';
import { NumericStringPipe } from 'src/utils/pipes/numeric-string.pipe';

@Controller('/movie-reviews')
@ApiTags('Movie Reviews')
export class ReviewsController {
  constructor(
    private readonly createReviewService: CreateReviewService,
    private readonly deleteReviewService: DeleteReviewService
  ) {}
  
  @Post()
  @ApiCreatedResponse({
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

  @Delete("/:id")
  @ApiOkResponse({
    description: 'Review deleted successfully',
    example: {
      message: "Review deleted successfully"
    }
  })
  @ApiNotFoundResponse({
    description: 'Review not found',
    example: {
      message: "Review not found",
    }
  })
  public async delete(@Param('id', NumericStringPipe) id: number) {
    return await this.deleteReviewService.execute(id);
  }
}
