import { Injectable, NotFoundException } from "@nestjs/common";
import { ReviewRepository } from "../repositories/rewiew.repository";
import { ReviewEntity } from "../entity/review.entity";
import { UpdateReviewDto } from "../dtos/update-review.dto";
import { ReviewResponseDTO } from "../dtos/review-response.dto";

@Injectable()
export class UpdateReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository
  ) {}
  
  public async execute(id: number, review: UpdateReviewDto) {
    const currentReview = await this.reviewRepository.findOneById(id);
    if (!currentReview) {
      throw new NotFoundException({
        message: "Review not found"
      });
    }
    
    const updatedReview = new ReviewEntity({
      ...currentReview,
      ...review,
      updatedAt: new Date()
    });

    const updated = await this.reviewRepository.update(id, updatedReview);
    return new ReviewResponseDTO(updated, "Review updated successfully");
  }
}