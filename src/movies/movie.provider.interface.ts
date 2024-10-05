export type MovieData = {
  Title: string,
  Year: string,
  imdbID: string,
  Type: "movie" | "series" | "episode",
  Poster: string
}

export type AllInformationMovie = {
  Released: string,
  Runtime: string,
  imdbRating: string,
  Genre: string,
  Director: string,
  Actors: string,
  Writer: string,
  Ratings: Array<{
    Source: string,
    Value: string
  }>
}

export interface IMovieProvider {

  /**
   * @description Get a list of movies based on the title
   * @param {title} title
   * 
   * @returns a list of movies 
   */
  getByTitle(title: string): Promise<MovieData[]>;

  /**
   * @description Get all the information of a movie
   * @param {imdbID} imdbID
   * 
   * @returns all the information of a movie
   */
  getById(imdbID: string): Promise<AllInformationMovie>;
}