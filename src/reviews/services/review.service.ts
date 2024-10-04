import { Injectable } from '@nestjs/common';
import { ReviewRepository } from '../repositories/rewiew.repository';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewRepository: ReviewRepository
  ) {}
}
