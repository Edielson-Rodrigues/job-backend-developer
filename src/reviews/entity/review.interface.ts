import { IsNotEmpty } from "class-validator";

export class Rating {
  @IsNotEmpty()
  source: string;

  @IsNotEmpty()
  value: string;
}

export interface IReview {
  id?: number;
  movieTitle: string;
  notes: string;
  movieRelease: string;
  imdbRating: number;
  movieGenre: string;
  movieDuration: string;
  director: string;
  actors: string;
  views: number; // ! TODO: add trigger to increment views
  writer: string;
  ratings: Array<Rating>;
  createdAt?: Date;
  updatedAt?: Date;
}
