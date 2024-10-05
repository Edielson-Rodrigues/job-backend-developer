import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateReviewDTO {
  @MaxLength(255, { message: 'Title is too long' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsNotEmpty({ message: 'Notes is required' })
  notes: string;
}