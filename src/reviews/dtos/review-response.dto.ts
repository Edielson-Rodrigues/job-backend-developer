import { ApiProperty } from "@nestjs/swagger";
import { IApiResponse } from "src/utils/api-response.interface";
import { ReviewEntity } from "../entity/review.entity";

class DataDTO {
  @ApiProperty({
    description: 'Id of the review',
    type: Number,
    example: 1
  })
  id: number;

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

export class ReviewResponseDTO implements IApiResponse {
  @ApiProperty({
    description: 'Message of the response',
    type: String,
    example: 'Review created successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Data of the response',
    type: DataDTO
  })
  data: DataDTO;

  constructor(review: ReviewEntity, message: string) {
    this.message = message;
    this.data = {
      id: review.id,
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
