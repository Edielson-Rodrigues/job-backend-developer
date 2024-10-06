import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ReviewEntity } from "../entity/review.entity";
import { UpdateReviewDto } from "../dtos/update-review.dto";
import { ReviewResponseDTO } from "../dtos/review-response.dto";
import { IReviewRepository } from "../repositories/review.repository.interface";

@Injectable()
export class UpdateReviewService {
  constructor(
    @Inject("IReviewRepository") private readonly reviewRepository: IReviewRepository
  ) {}
  
  public async execute(id: number, review: UpdateReviewDto): Promise<ReviewResponseDTO> {
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