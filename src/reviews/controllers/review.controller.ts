import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateReviewService } from '../services/create-review.service';
import { CreateReviewDTO } from '../dtos/create-review.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteReviewService } from '../services/delete-review.service';
import { NumericStringPipe } from 'src/utils/pipes/numeric-string.pipe';
import { UpdateReviewService } from '../services/update-review.service';
import { UpdateReviewDto } from '../dtos/update-review.dto';
import { ReviewResponseDTO } from '../dtos/review-response.dto';
import { GetReviewService } from '../services/get-review.service';
import { PaginationPipe } from 'src/utils/pipes/pagination.pipe';
import { ReviewFilters } from '../repositories/review.repository.interface';
import { OrderByReviewPipe } from 'src/utils/pipes/orderBy-review.pipe';
import { OrderPipe } from 'src/utils/pipes/order.pipe';
import { PaginationReviewResponseDTO } from '../dtos/pagination-review.dto';

@Controller('/movie-reviews')
@ApiTags('Movie Reviews')
export class ReviewsController {
  constructor(
    private readonly createReviewService: CreateReviewService,
    private readonly deleteReviewService: DeleteReviewService,
    private readonly updateReviewService: UpdateReviewService,
    private readonly getReviewService: GetReviewService
  ) {}
  
  @Post()
  @ApiCreatedResponse({
    description: 'Review created successfully',
    type: ReviewResponseDTO
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

  @Get("/:id")
  @ApiOkResponse({
    description: 'Review found successfully',
    type: ReviewResponseDTO
  })
  @ApiNotFoundResponse({
    description: 'Review not found',
    example: {
      message: "Review not found"
    }
  })
  public async getById(@Param('id', NumericStringPipe) id: number) {
    return await this.getReviewService.byId(id);
  }

  @Get()
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ 
    name: "filter", 
    required: false, 
    type: String, 
    description: "Value to filter in fields (title | actors | director)" 
  })
  @ApiQuery({ 
    name: "orderBy", 
    required: false, 
    type: String, 
    enum: ["releasedDate", "imdbRating"], 
    description: "Order by reviews" 
  })
  @ApiQuery({ 
    name: "order", 
    required: false, 
    type: String, 
    enum: ["ASC", "DESC"], 
    description: "Order"
  })
  @ApiOkResponse({
    description: 'Reviews found successfully',
    type: PaginationReviewResponseDTO
  })
  public async get(
    @Query('page', PaginationPipe) page: number,
    @Query('limit', PaginationPipe) limit: number,
    @Query('filter') filter: string,
    @Query('orderBy', OrderByReviewPipe) orderBy: string,
    @Query('order', OrderPipe) order: string
  ) {
    return await this.getReviewService.all(
      { page, limit }, 
      { filter, orderBy, order } as ReviewFilters
    );
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

  @Put("/:id")
  @ApiOkResponse({
    description: 'Review updated successfully',
    type: ReviewResponseDTO
  })
  @ApiNotFoundResponse({
    description: 'Review not found',
    example: {
      message: "Review not found"
    }
  })
  public async update(@Param('id', NumericStringPipe) id: number, @Body() review: UpdateReviewDto) {
    return await this.updateReviewService.execute(id, review);
  }
}
