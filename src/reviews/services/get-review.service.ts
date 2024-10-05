import { Injectable, NotFoundException } from "@nestjs/common";
import { ReviewRepository } from "../repositories/rewiew.repository";
import { ReviewResponseDTO } from "../dtos/review-response.dto";

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
}