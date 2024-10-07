import { IsNotEmpty } from "class-validator";

export class Rating {
  @IsNotEmpty()
  source: string;

  @IsNotEmpty()
  value: string;
}

export interface IReview {
  id?: number;
  title: string;
  notes: string;
  releaseDate: Date;
  imdbRating: number;
  genre: string;
  duration: string;
  director: string;
  actors: string;
  views: number;
  writer: string;
  ratings: Array<Rating>;
  createdAt?: Date;
  updatedAt?: Date;
}
