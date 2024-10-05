import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ReviewRepository } from "../repositories/rewiew.repository";

@Injectable()
export class DeleteReviewService {
  constructor(
    @Inject("IReviewRepository") private readonly reviewRepository: ReviewRepository
  ) {}
  
  public async execute(id: number): Promise<{ 
    message: string
   }> {
    const review  =  await this.reviewRepository.findOneById(id);
    if (!review) {
      throw new NotFoundException({
        message: "Review not found"
      })
    }

    const linesAffects = await this.reviewRepository.delete(id);

    if (linesAffects === 0) {
      throw new BadRequestException({
        message: "Error deleting review"
      })
    }

    return {
      message: "Review deleted successfully"
    }
  }
}