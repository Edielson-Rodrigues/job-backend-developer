import { IsNotEmpty, MaxLength } from "class-validator";
import { ReviewEntity } from "../entity/review.entity";

export type CreateResponseDTO = {
  movieTitle: string;
  notes: string;
  movie: {
    release: string;
    imdbRating: number;
    genre: string;
    duration: string;
    director: string;
    actors: string;
    writer: string;
    ratings: Array<{
      source: string;
      value: string;
    }>;
  }
}

export class CreateReviewDTO {
  @MaxLength(255, { message: 'Title is too long' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsNotEmpty({ message: 'Notes is required' })
  notes: string;

  toResponse(review: ReviewEntity): CreateResponseDTO {
    return {
      movieTitle: review.movieTitle,
      notes: review.notes,
      movie: {
        imdbRating: review.imdbRating,
        release: review.movieRelease,
        genre: review.movieGenre,
        duration: review.movieDuration,
        director: review.director,
        actors: review.actors,
        writer: review.writer,
        ratings: review.ratings
      }
    }
  }
}