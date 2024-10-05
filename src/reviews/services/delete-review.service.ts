import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { ReviewRepository } from "../repositories/rewiew.repository";

@Injectable()
export class DeleteReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository
  ) {}
  
  public async execute(id: string): Promise<{ 
    message: string
   }> {
    const review  =  await this.reviewRepository.findOneById(Number(id));
    if (!review) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: "Review not found"
      })
    }

    const linesAffects =  await this.reviewRepository.delete(review.id);

    if (linesAffects === 0) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: "Error deleting review"
      })
    }

    return {
      message: "Review deleted successfully"
    }
  }
}