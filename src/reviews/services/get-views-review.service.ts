import { Inject } from "@nestjs/common";
import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { IReviewRepository } from "../repositories/review.repository.interface";
import { PaginationViewReviewResponseDTO } from "../dtos/pagination-review.dto";

export class GetViewsReviewService {
  constructor(
    @Inject('IReviewRepository') private readonly reviewRepository: IReviewRepository
  ) {}

  async execute(argumentsPagination: IPaginationOptions, order: 'ASC' | 'DESC'): Promise<PaginationViewReviewResponseDTO>  {
    const reviews = await this.reviewRepository.find(argumentsPagination, { filter: '', orderBy: 'views', order });
    
    return new PaginationViewReviewResponseDTO({
      message: 'Reviews found successfully',
      meta: reviews.meta,
      data: reviews.items.map(review => ({
        id: review.id,
        movieTitle: review.title,
        views: review.views
      }))
    });
  }
}