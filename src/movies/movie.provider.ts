import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IMovieProvider } from './movie.provider.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OmdbProvider implements IMovieProvider {
  private readonly apikey: string = process.env.OMDB_API_KEY;

  constructor(
    private readonly httpService: HttpService
  ) {}

  public async getMovies(title: string): Promise<any> {
    try {
      const url = `https://www.omdbapi.com/?apikey=${this.apikey}&s=${title}`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
