import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ReviewRepository } from '../repositories/rewiew.repository';
import { CreateReviewDTO } from '../dtos/create-review.dto';
import { IMovieProvider } from 'src/movies/movie.provider.interface';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    @Inject("IMovieProvider") private readonly movieProvider: IMovieProvider
  ) {}

  public async create(review: CreateReviewDTO): Promise<{ 
    status: HttpStatus,
    data: any
  }> {
    const movies = await this.movieProvider.getMovies(review.title);
      
    return {
      status: HttpStatus.CREATED,
      data: movies
    }
  }

}
