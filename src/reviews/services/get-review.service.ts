import { Injectable, NotFoundException } from "@nestjs/common";
import { ReviewRepository } from "../repositories/rewiew.repository";
import { ReviewResponseDTO } from "../dtos/review-response.dto";
import { PaginationReviewResponseDTO } from "../dtos/pagination-review.dto";

@Injectable()
export class GetReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository
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

  public async all(page: number, limit: number): Promise<PaginationReviewResponseDTO> {
    const reviews = await this.reviewRepository.find({ page, limit });

    return new PaginationReviewResponseDTO({
      message: "Reviews found successfully",
      meta: reviews.meta,
      data: reviews.items.map(review => new ReviewResponseDTO(review).data)
    });
  }
}