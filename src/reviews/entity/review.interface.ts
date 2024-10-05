export interface IReview {
  id: number;
  movieTitle: string;
  notes: string;
  movieRelease: Date;
  imdbRating: number;
  movieGenre: string;
  movieDuration: number;
  director: string;
  actors: string;
  views: number; // ! TODO: add trigger to increment views
  createdAt: Date;
  updatedAt: Date;
}
