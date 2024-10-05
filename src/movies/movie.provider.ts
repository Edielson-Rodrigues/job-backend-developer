import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AllInformationMovie,
  IMovieProvider,
   MovieData
} from './movie.provider.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OmdbProvider implements IMovieProvider {
  private readonly apikey: string = process.env.OMDB_API_KEY;

  constructor(
    private readonly httpService: HttpService
  ) {}

  public async getByTitle(title: string): Promise<MovieData[]> {
    const url = `https://www.omdbapi.com/?apikey=${this.apikey}&s=${title}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data.Search;
  }

  public async getById(imdbID: string): Promise<AllInformationMovie> {
    const url = `https://www.omdbapi.com/?apikey=${this.apikey}&i=${imdbID}`;
    const { data: response } = await lastValueFrom(this.httpService.get(url));
    return {
      imdbRating: response.imdbRating,
      Ratings: response.Ratings,
      Released: response.Released,
      Runtime: response.Runtime,
      Genre: response.Genre,
      Director: response.Director,
      Writer: response.Writer,
      Actors: response.Actors,
    }
  }
}
