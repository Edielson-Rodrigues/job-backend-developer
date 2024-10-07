import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ReviewResponseDTO } from "../dtos/review-response.dto";
import { PaginationReviewResponseDTO } from "../dtos/pagination-review.dto";
import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { IReviewRepository, ReviewFilters, UpdateViewsDTO } from "../repositories/review.repository.interface";

@Injectable()
export class GetReviewService {
  constructor(
    @Inject("IReviewRepository") private readonly reviewRepository: IReviewRepository
  ) {}

  public async byId(id: number): Promise<ReviewResponseDTO> {
    const review = await this.reviewRepository.findOneById(id);
    if (!review) {
      throw new NotFoundException({
        message: "Review not found"
      });
    }
    
    const views = review.views + 1;
    this.reviewRepository.updateViews([
      { id, views }
    ]);

    return new ReviewResponseDTO(review, "Review found successfully");
  }

  public async all(argumentsPagination: IPaginationOptions, filters: ReviewFilters): Promise<PaginationReviewResponseDTO> {
    const reviews = await this.reviewRepository.find(
      argumentsPagination,
      filters
    );
    
    const newViews: Array<UpdateViewsDTO> = [];
    const data = reviews.items.map(review => {
      newViews.push({ id: review.id, views: review.views + 1 });
      return new ReviewResponseDTO(review).data;
    });

    this.reviewRepository.updateViews(newViews);
  
    return new PaginationReviewResponseDTO({
      message: "Reviews found successfully",
      meta: reviews.meta,
      data
    });
  }
}