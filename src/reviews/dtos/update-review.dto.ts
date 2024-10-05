import { IsArray, IsDateString, IsNotEmpty, IsOptional, MaxLength, ValidateNested } from "class-validator";
import { Rating } from "../entity/review.interface";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateReviewDto {
  @ApiProperty({
    description: 'Title of the movie to review',
    type: String,
    maxLength: 255,
    example: 'The Shawshank Redemption'
  })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(255, { message: 'Title is too long' })
  movieTitle: string;

  @ApiProperty({
    description: 'Notes about the movie',
    type: String,
    example: 'This movie is amazing'
  })
  @IsNotEmpty({ message: 'Notes is required' })
  notes: string;

  @ApiProperty({
    description: 'Release date of the movie',
    type: String,
    example: '1994'
  })
  @IsDateString()
  movieRelease: Date;

  @ApiProperty({
    description: 'IMDb rating of the movie',
    type: Number,
    example: 9.3
  })
  @IsOptional()
  imdbRating: number;

  @ApiProperty({
    description: 'Genre of the movie',
    type: String,
    example: 'Drama'
  })
  @IsNotEmpty({ message: 'Genre is required' })
  movieGenre: string;

  @ApiProperty({
    description: 'Duration of the movie',
    type: String,
    example: '142 min'
  })
  @IsNotEmpty({ message: 'Duration is required' })
  movieDuration: string;

  @ApiProperty({
    description: 'Director of the movie',
    type: String,
    example: 'Frank Darabont'
  })
  @IsNotEmpty({ message: 'Director is required' })
  director: string;

  @ApiProperty({
    description: 'Actors in the movie',
    type: String,
    example: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler'
  })
  @IsNotEmpty({ message: 'Actors is required' })
  actors: string;

  @ApiProperty({
    description: 'Writer of the movie',
    type: String,
    example: 'Stephen King, Frank Darabont'
  })
  @IsNotEmpty({ message: 'Views is required' })
  writer: string;

  @ApiProperty({
    description: 'Ratings of the movie',
    type: Array,
    example: [
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
  })
  @IsNotEmpty({ message: 'Ratings is required' })
  @ValidateNested({ each: true })
  @Type(() => Rating)
  @IsArray()
  ratings: Array<Rating>;
}
