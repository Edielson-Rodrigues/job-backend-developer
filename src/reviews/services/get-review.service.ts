import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ReviewRepository } from "../repositories/rewiew.repository";
import { ReviewResponseDTO } from "../dtos/review-response.dto";
import { PaginationReviewResponseDTO } from "../dtos/pagination-review.dto";
import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { ReviewFilters } from "../repositories/review.repository.interface";

@Injectable()
export class GetReviewService {
  constructor(
    @Inject("IReviewRepository") private readonly reviewRepository: ReviewRepository
  ) {}

  public async byId(id: number): Promise<ReviewResponseDTO> {
    const review = await this.reviewRepository.findOneById(id);
    if (!review) {
      throw new NotFoundException({
        message: "Review not found"
      });
    }

    return new ReviewResponseDTO(review, "Review found successfully");
  }

  public async all(argumentsPagination: IPaginationOptions, filters: ReviewFilters): Promise<PaginationReviewResponseDTO> {
    const reviews = await this.reviewRepository.find(
      argumentsPagination,
      filters
    );
    return new PaginationReviewResponseDTO({
      message: "Reviews found successfully",
      meta: reviews.meta,
      data: reviews.items.map(review => new ReviewResponseDTO(review).data)
    });
  }
}