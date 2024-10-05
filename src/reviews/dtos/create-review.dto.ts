import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
