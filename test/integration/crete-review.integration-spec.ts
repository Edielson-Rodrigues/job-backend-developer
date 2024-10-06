import * as request from 'supertest';
import { mockAppModule, mockMovieProvider } from '../jest.integration-setup';
import { HttpStatus } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';

describe('[Integration] CreateReview', () => {
  it('should return response with status Created and review with type ReviewResponseDTO', async () => {
    // arrange
    const parameters = {
      title: 'Harry Potter and the Deathly Hallows: Part 2',
      notes: faker.lorem.sentence()
    };
    const mockMovie = {
      Title: 'Harry Potter and the Deathly Hallows: Part 2',
      Year: faker.date.past().getFullYear().toString(),
      imdbID: crypto.randomUUID(),
      Type: faker.helpers.arrayElement(['movie', 'series', 'episode']),
      Poster: faker.image.url()
    };
    const mockAllInformationMovie = {
      Released: "15 May 2023",
      Runtime: faker.date.future().toString(),
      imdbRating: faker.number.float().toString(),
      Genre: faker.lorem.word(),
      Director: faker.person.firstName(),
      Actors: faker.person.firstName(),
      Writer: faker.person.firstName(),
      Ratings: [
        {
          Source: faker.lorem.word(),
          Value: faker.lorem.word()
        }
      ]
    }
    mockMovieProvider.getByTitle.mockResolvedValue([mockMovie]);
    mockMovieProvider.getById.mockResolvedValue(mockAllInformationMovie);

    // act
    const response = await request(mockAppModule.getHttpServer())
      .post('/movie-reviews')
      .send(parameters);

    // assert
    expect(response.status).toBe(HttpStatus.CREATED.valueOf());
    expect(response.body).toEqual({
      message: "Review created successfully",
      data: {
        id: expect.any(Number),
        movieTitle: parameters.title,
        notes: parameters.notes,
        movie: {
          release: new Date(mockAllInformationMovie.Released).toISOString(),
          imdbRating: Number(mockAllInformationMovie.imdbRating),
          genre: mockAllInformationMovie.Genre,
          duration: mockAllInformationMovie.Runtime,
          director: mockAllInformationMovie.Director,
          actors: mockAllInformationMovie.Actors,
          writer: mockAllInformationMovie.Writer,
          ratings: mockAllInformationMovie.Ratings.map(rating => ({
            source: rating.Source,
            value: rating.Value
          }))
        }
      }
    });
  });

  it('should return response with status NotFound, but also return a list of similar movies', async () => {
    // arrange
    const parameters = {
      title: 'harry potter',
      notes: faker.lorem.sentence()
    }
    const mockResponseProvider = [
      {
        Title: 'Harry Potter and the Deathly Hallows: Part 2',
        Year: '2011',
        imdbID: 'tt1201607',
        Type: 'movie' as "movie" | "series" | "episode",
        Poster: 'https://m.media-amazon.com/images/M/MV5BOTA1Mzc2N2ItZWRiNS00MjQzLTlmZDQtMjU0NmY1YWRkMGQ4XkEyXkFqcGc@._V1_SX300.jpg'
      },
      {
        Title: "Harry Potter and the Sorcerer's Stone",
        Year: '2001',
        imdbID: 'tt0241527',
        Type: 'movie' as "movie" | "series" | "episode",
        Poster: 'https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg'
      }
    ];
    mockMovieProvider.getByTitle.mockResolvedValue(mockResponseProvider);
    const mockResponse = {
      message: "Movie not found",
      data: {
        similarMovies: mockResponseProvider.map(movie => movie.Title)
      }
    }

    // act
    const response = await request(mockAppModule.getHttpServer())
      .post('/movie-reviews')
      .send(parameters);
  
    // assert
    expect(response.status).toBe(HttpStatus.NOT_FOUND.valueOf());
    expect(response.body).toEqual(mockResponse);
  });

  it('should return response with status NotFound because movie not found', async () => {
    // arrange
    const parameters = {
      title: crypto.randomUUID(),
      notes: faker.lorem.sentence()
    }
    mockMovieProvider.getByTitle.mockResolvedValue(null);

    // act
    const response = await request(mockAppModule.getHttpServer())
      .post('/movie-reviews')
      .send(parameters);
    
    // assert
    expect(response.status).toBe(HttpStatus.NOT_FOUND.valueOf());
    expect(response.body).toEqual({
      message: "Movie not found"
    });
  });

  it('should return response with status BadRequest because invalids parameters', async () => {
    // arrange
    const parameters = {
      title: faker.lorem.word(),
    };
    const mockResponse = {
      "message": [
          "Notes is required"
      ],
      "error": "Bad Request",
      "statusCode": HttpStatus.BAD_REQUEST.valueOf()
  }

    // act
    const response = await request(mockAppModule.getHttpServer())
      .post('/movie-reviews')
      .send(parameters);

    // assert
    expect(response.status).toBe(HttpStatus.BAD_REQUEST.valueOf());
    expect(response.body).toEqual(mockResponse);
  });
});