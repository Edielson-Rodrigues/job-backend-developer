
export interface IMovieProvider {

  /**
   * @description Get a list of movies based on the  
   * @param {title} title
   * 
   * @returns a list of movies 
   */
  getMovies(title: string): Promise<any[]>;
}