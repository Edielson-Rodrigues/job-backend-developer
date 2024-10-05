import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ReviewEntity } from "../entity/review.entity";
import { IApiResponse } from "src/utils/api-response.interface";

export class CreateReviewDTO {
  @ApiProperty({
    description: 'Title of the movie to review',
    type: String,
    maxLength: 255,
    example: 'The Shawshank Redemption'
  })
  @MaxLength(255, { message: 'Title is too long' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    description: 'Notes about the movie',
    type: String,
    example: 'This movie is amazing'
  })
  @IsNotEmpty({ message: 'Notes is required' })
  notes: string;
}

class ReviewResponseDTO {
  @ApiProperty({
    description: 'Title of the movie reviewed',
    type: String,
    example: 'The Shawshank Redemption'
  })
  movieTitle: string;

  @ApiProperty({
    description: 'Notes about the movie',
    type: String,
    example: 'This movie is amazing'
  })
  notes: string;

  @ApiProperty({
    description: 'Information about the movie',
    type: Object,
    example: {
      release: '1994',
      imdbRating: 9.3,
      genre: 'Drama',
      duration: '142 min',
      director: 'Frank Darabont',
      actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
      writer: 'Stephen King, Frank Darabont',
      ratings: [
        {
          source: 'Internet Movie Database',
          value: '9.3/10'
        },
        {
          source: 'Rotten Tomatoes',
          value: '91%'
        },
        {
          source: 'Metacritic',
          value: '80/100'
        }
      ]
    }
  })
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

export class CreateReviewResponseDTO implements IApiResponse {
  @ApiProperty({
    description: 'Message of the response',
    type: String,
    example: 'Review created successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Data of the response',
    type: ReviewResponseDTO
  })
  data: ReviewResponseDTO;

  constructor(review: ReviewEntity, message: string) {
    this.message = message;
    this.data = {
      movieTitle: review.movieTitle,
      notes: review.notes,
      movie: {
        release: review.movieRelease,
        imdbRating: review.imdbRating,
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
