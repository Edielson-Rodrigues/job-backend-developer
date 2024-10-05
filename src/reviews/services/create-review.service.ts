import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from '../repositories/rewiew.repository';
import { CreateReviewDTO, CreateReviewResponseDTO } from '../dtos/create-review.dto';
import { IMovieProvider, MovieData } from 'src/movies/movie.provider.interface';
import { LevenshteinDistance } from 'natural';
import { ReviewEntity } from '../entity/review.entity';

@Injectable()
export class CreateReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    @Inject("IMovieProvider") private readonly movieProvider: IMovieProvider
  ) {}

  public async execute(review: CreateReviewDTO): Promise<CreateReviewResponseDTO> {
    const movies = await this.movieProvider.getByTitle(review.title);
    if (!movies) {
      throw new NotFoundException({
        message: "Movie not found"
      })
    }

    const perfectMatch = this.findBestMatch(review.title, movies);

    if (!perfectMatch) {
      throw new NotFoundException({
        message: "Movie not found",
        data: {
          similarMovies: movies.map(movie => movie.Title)
        }
      })
    }

    const allInformationMovie = await this.movieProvider.getById(perfectMatch.imdbID);
    const newReview = await this.reviewRepository.create(new ReviewEntity({
      movieTitle: perfectMatch.Title,
      notes: review.notes,
      movieRelease: allInformationMovie.Released,
      imdbRating: (/^-?\d+(\.\d+)?$/).test(allInformationMovie.imdbRating) ? Number(allInformationMovie.imdbRating) : null,
      movieGenre: allInformationMovie.Genre,
      movieDuration: allInformationMovie.Runtime,
      director: allInformationMovie.Director,
      actors: allInformationMovie.Actors,
      views: 0,
      writer: allInformationMovie.Writer,
      ratings: allInformationMovie.Ratings.map(rating => ({ source: rating.Source, value: rating.Value })),
    }));

    return new CreateReviewResponseDTO(newReview, "Review created successfully");
  }

  private findBestMatch(title: string, movies: MovieData[]): MovieData {
    let perfectMatch: MovieData = null;

    for (const movie of movies) {
      const searchedTitle = title.toLowerCase().trim();
      const movieTitle = movie.Title.toLowerCase();
      const distance = LevenshteinDistance(searchedTitle, movieTitle);
      const matchPercentage = 100 - (distance / title.length) * 100;

      if (matchPercentage === 100) {
        perfectMatch = movie;
        break;
      }
    }

    return perfectMatch;
  }
}
