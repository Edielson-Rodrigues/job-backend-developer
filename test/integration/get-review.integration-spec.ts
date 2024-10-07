import * as request from 'supertest';
import { faker } from "@faker-js/faker/.";
import { mockAppModule } from "../jest.integration-setup";
import { HttpStatus } from '@nestjs/common';

describe('[Integration] GetReview', () => {
  describe('GET /movie-reviews', () => {
    it('should return response with status OK and reviews with default filters and pagination', async () => {
      // act
      const response = await request(mockAppModule.getHttpServer())
        .get('/movie-reviews');

      // assert
      expect(response.status).toBe(HttpStatus.OK.valueOf());
      expect(response.body).toEqual({
        message: 'Reviews found successfully',
        meta: {
          itemCount: 3,
          totalItems: 3,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1
        },
        data: [
          {
            id: 1,
            movieTitle: 'The Shawshank Redemption',
            notes: 'This movie is amazing',
            movie: {
              release: '1994-01-01T00:00:00.000Z',
              imdbRating: 9.3,
              genre: 'Drama',
              duration: '142 min',
              director: 'Frank Darabont',
              actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
              writer: 'Stephen King, Frank Darabont',
              ratings: [
                { value: '9.3/10', source: 'Internet Movie Database' },
                { value: '91%', source: 'Rotten Tomatoes' },
                { value: '80/100', source: 'Metacritic' }
              ]
            }
          },
          {
            id: 2,
            movieTitle: 'The Matrix',
            notes: 'A groundbreaking sci-fi classic',
            movie: {
              release: '1999-03-31T00:00:00.000Z',
              imdbRating: 8.7,
              genre: 'Sci-Fi',
              duration: '136 min',
              director: 'Lana Wachowski, Lilly Wachowski',
              actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
              writer: 'Lana Wachowski, Lilly Wachowski',
              ratings: [
                { value: '8.7/10', source: 'Internet Movie Database' },
                { value: '87%', source: 'Rotten Tomatoes' },
                { value: '73/100', source: 'Metacritic' }
              ]
            }
          },
          {
            id: 3,
            movieTitle: 'Inception',
            notes: 'A mind-bending thriller',
            movie: {
              release: '2010-07-16T00:00:00.000Z',
              imdbRating: 8.8,
              genre: 'Action, Adventure, Sci-Fi',
              duration: '148 min',
              director: 'Christopher Nolan',
              actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy',
              writer: 'Christopher Nolan',
              ratings: [
                { value: '8.8/10', source: 'Internet Movie Database' },
                { value: '87%', source: 'Rotten Tomatoes' },
                { value: '74/100', source: 'Metacritic' }
              ]
            }
          }
        ]
      });
    });

    it('should return response with status ok and ordered by imdbRating in DESC', async () => {
      // act
      const response = await request(mockAppModule.getHttpServer())
        .get('/movie-reviews')
        .query({
          orderBy: 'imdbRating',
          order: 'DESC'
        })

      // assert
      expect(response.status).toBe(HttpStatus.OK.valueOf());
      expect(response.body).toEqual({
        message: 'Reviews found successfully',
        meta: {
          itemCount: 3,
          totalItems: 3,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1
        },
        data: [
          {
            id: 1,
            movieTitle: 'The Shawshank Redemption',
            notes: 'This movie is amazing',
            movie: {
              release: '1994-01-01T00:00:00.000Z',
              imdbRating: 9.3,
              genre: 'Drama',
              duration: '142 min',
              director: 'Frank Darabont',
              actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
              writer: 'Stephen King, Frank Darabont',
              ratings: [
                { value: '9.3/10', source: 'Internet Movie Database' },
                { value: '91%', source: 'Rotten Tomatoes' },
                { value: '80/100', source: 'Metacritic' }
              ]
            }
          },
          {
            id: 3,
            movieTitle: 'Inception',
            notes: 'A mind-bending thriller',
            movie: {
              release: '2010-07-16T00:00:00.000Z',
              imdbRating: 8.8,
              genre: 'Action, Adventure, Sci-Fi',
              duration: '148 min',
              director: 'Christopher Nolan',
              actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy',
              writer: 'Christopher Nolan',
              ratings: [
                { value: '8.8/10', source: 'Internet Movie Database' },
                { value: '87%', source: 'Rotten Tomatoes' },
                { value: '74/100', source: 'Metacritic' }
              ]
            }
          },
          {
            id: 2,
            movieTitle: 'The Matrix',
            notes: 'A groundbreaking sci-fi classic',
            movie: {
              release: '1999-03-31T00:00:00.000Z',
              imdbRating: 8.7,
              genre: 'Sci-Fi',
              duration: '136 min',
              director: 'Lana Wachowski, Lilly Wachowski',
              actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
              writer: 'Lana Wachowski, Lilly Wachowski',
              ratings: [
                { value: '8.7/10', source: 'Internet Movie Database' },
                { value: '87%', source: 'Rotten Tomatoes' },
                { value: '73/100', source: 'Metacritic' }
              ]
            }
          },
        ]
      });
    });

    it('should return response with status ok and ordered by imdbRating in ASC', async () => {
      // act
      const response = await request(mockAppModule.getHttpServer())
        .get('/movie-reviews')
        .query({
          orderBy: 'imdbRating',
          order: 'ASC'
        });

      // assert
      expect(response.status).toBe(HttpStatus.OK.valueOf());
      expect(response.body).toEqual({
        message: 'Reviews found successfully',
        meta: {
          itemCount: 3,
          totalItems: 3,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1
        },
        data: [
          {
            id: 2,
            movieTitle: 'The Matrix',
            notes: 'A groundbreaking sci-fi classic',
            movie: {
              release: '1999-03-31T00:00:00.000Z',
              imdbRating: 8.7,
              genre: 'Sci-Fi',
              duration: '136 min',
              director: 'Lana Wachowski, Lilly Wachowski',
              actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
              writer: 'Lana Wachowski, Lilly Wachowski',
              ratings: [
                { value: '8.7/10', source: 'Internet Movie Database' },
                { value: '87%', source: 'Rotten Tomatoes' },
                { value: '73/100', source: 'Metacritic' }
              ]
            }
          },
          {
            id: 3,
            movieTitle: 'Inception',
            notes: 'A mind-bending thriller',
            movie: {
              release: '2010-07-16T00:00:00.000Z',
              imdbRating: 8.8,
              genre: 'Action, Adventure, Sci-Fi',
              duration: '148 min',
              director: 'Christopher Nolan',
              actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy',
              writer: 'Christopher Nolan',
              ratings: [
                { value: '8.8/10', source: 'Internet Movie Database' },
                { value: '87%', source: 'Rotten Tomatoes' },
                { value: '74/100', source: 'Metacritic' }
              ]
            }
          },
          {
            id: 1,
            movieTitle: 'The Shawshank Redemption',
            notes: 'This movie is amazing',
            movie: {
              release: '1994-01-01T00:00:00.000Z',
              imdbRating: 9.3,
              genre: 'Drama',
              duration: '142 min',
              director: 'Frank Darabont',
              actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
              writer: 'Stephen King, Frank Darabont',
              ratings: [
                { value: '9.3/10', source: 'Internet Movie Database' },
                { value: '91%', source: 'Rotten Tomatoes' },
                { value: '80/100', source: 'Metacritic' }
              ]
            }
          }
        ]
      });
    });
    
    it('should return response with status ok and ordered by releasedDate in DESC', async () => {
      // act
      const response = await request(mockAppModule.getHttpServer())
        .get('/movie-reviews')
        .query({
          orderBy: 'releaseDate',
          order: 'DESC'
        });

      // assert
      expect(response.status).toBe(HttpStatus.OK.valueOf());
      expect(response.body).toEqual({
        message: 'Reviews found successfully',
        meta: {
          itemCount: 3,
          totalItems: 3,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1
        },
        data: [
          {
            id: 3,
            movieTitle: 'Inception',
            notes: 'A mind-bending thriller',
            movie: {
              release: '2010-07-16T00:00:00.000Z',
              imdbRating: 8.8,
              genre: 'Action, Adventure, Sci-Fi',
              duration: '148 min',
              director: 'Christopher Nolan',
              actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy',
              writer: 'Christopher Nolan',
              ratings: [
                { value: '8.8/10', source: 'Internet Movie Database' },
                { value: '87%', source: 'Rotten Tomatoes' },
                { value: '74/100', source: 'Metacritic' }
              ]
            }
          },
          {
            id: 2,
            movieTitle: 'The Matrix',
            notes: 'A groundbreaking sci-fi classic',
            movie: {
              release: '1999-03-31T00:00:00.000Z',
              imdbRating: 8.7,
              genre: 'Sci-Fi',
              duration: '136 min',
              director: 'Lana Wachowski, Lilly Wachowski',
              actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
              writer: 'Lana Wachowski, Lilly Wachowski',
              ratings: [
                { value: '8.7/10', source: 'Internet Movie Database' },
                { value: '87%', source: 'Rotten Tomatoes' },
                { value: '73/100', source: 'Metacritic' }
              ]
            }
          },
          {
            id: 1,
            movieTitle: 'The Shawshank Redemption',
            notes: 'This movie is amazing',
            movie: {
              release: '1994-01-01T00:00:00.000Z',
              imdbRating: 9.3,
              genre: 'Drama',
              duration: '142 min',
              director: 'Frank Darabont',
              actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
              writer: 'Stephen King, Frank Darabont',
              ratings: [
                { value: '9.3/10', source: 'Internet Movie Database' },
                { value: '91%', source: 'Rotten Tomatoes' },
                { value: '80/100', source: 'Metacritic' }
              ]
            }
          }
        ]
      });
    });

    it('should return response with status ok and ordered by releasedDate in DESC', async () => {
      // act
      const response = await request(mockAppModule.getHttpServer())
        .get('/movie-reviews')
        .query({
          orderBy: 'releaseDate',
          order: 'ASC'
        });

      // assert
      expect(response.status).toBe(HttpStatus.OK.valueOf());
      expect(response.body).toEqual({
        message: 'Reviews found successfully',
        meta: {
          itemCount: 3,
          totalItems: 3,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1
        },
        data: [
          {
            id: 1,
            movieTitle: 'The Shawshank Redemption',
            notes: 'This movie is amazing',
            movie: {
              release: '1994-01-01T00:00:00.000Z',
              imdbRating: 9.3,
              genre: 'Drama',
              duration: '142 min',
              director: 'Frank Darabont',
              actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
              writer: 'Stephen King, Frank Darabont',
              ratings: [
                { value: '9.3/10', source: 'Internet Movie Database' },
                { value: '91%', source: 'Rotten Tomatoes' },
                { value: '80/100', source: 'Metacritic' }
              ]
            }
          },
          {
            id: 2,
            movieTitle: 'The Matrix',
            notes: 'A groundbreaking sci-fi classic',
            movie: {
              release: '1999-03-31T00:00:00.000Z',
              imdbRating: 8.7,
              genre: 'Sci-Fi',
              duration: '136 min',
              director: 'Lana Wachowski, Lilly Wachowski',
              actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
              writer: 'Lana Wachowski, Lilly Wachowski',
              ratings: [
                { value: '8.7/10', source: 'Internet Movie Database' },
                { value: '87%', source: 'Rotten Tomatoes' },
                { value: '73/100', source: 'Metacritic' }
              ]
            }
          },
          {
            id: 3,
            movieTitle: 'Inception',
            notes: 'A mind-bending thriller',
            movie: {
              release: '2010-07-16T00:00:00.000Z',
              imdbRating: 8.8,
              genre: 'Action, Adventure, Sci-Fi',
              duration: '148 min',
              director: 'Christopher Nolan',
              actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy',
              writer: 'Christopher Nolan',
              ratings: [
                { value: '8.8/10', source: 'Internet Movie Database' },
                { value: '87%', source: 'Rotten Tomatoes' },
                { value: '74/100', source: 'Metacritic' }
              ]
            }
          }
        ]
      });
    });

    it('should return response with status OK and reviews data with filters', async () => {
      // act
      const response = await request(mockAppModule.getHttpServer())
        .get('/movie-reviews')
        .query({
          filter: 'The Shawshank Redemption',
        });

      // assert
      expect(response.status).toBe(HttpStatus.OK.valueOf());
      expect(response.body).toEqual({
        message: 'Reviews found successfully',
        meta: {
          itemCount: 1,
          totalItems: 1,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1
        },
        data: [
          {
            id: 1,
            movieTitle: 'The Shawshank Redemption',
            notes: 'This movie is amazing',
            movie: {
              release: '1994-01-01T00:00:00.000Z',
              imdbRating: 9.3,
              genre: 'Drama',
              duration: '142 min',
              director: 'Frank Darabont',
              actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
              writer: 'Stephen King, Frank Darabont',
              ratings: [
                { value: '9.3/10', source: 'Internet Movie Database' },
                { value: '91%', source: 'Rotten Tomatoes' },
                { value: '80/100', source: 'Metacritic' }
              ]
            }
          }
        ]
      });
    });

    it('should return response with status OK and reviews data with pagination', async () => {
      // act
      const response = await request(mockAppModule.getHttpServer())
        .get('/movie-reviews')
        .query({
          page: 1,
          limit: 2
        });

      // assert
      expect(response.status).toBe(HttpStatus.OK.valueOf());
      expect(response.body).toEqual({
        message: 'Reviews found successfully',
        meta: {
          itemCount: 2,
          totalItems: 3,
          itemsPerPage: 2,
          totalPages: 2,
          currentPage: 1
        },
        data: [
          {
            id: 1,
            movieTitle: 'The Shawshank Redemption',
            notes: 'This movie is amazing',
            movie: {
              release: '1994-01-01T00:00:00.000Z',
              imdbRating: 9.3,
              genre: 'Drama',
              duration: '142 min',
              director: 'Frank Darabont',
              actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
              writer: 'Stephen King, Frank Darabont',
              ratings: [
                { value: '9.3/10', source: 'Internet Movie Database' },
                { value: '91%', source: 'Rotten Tomatoes' },
                { value: '80/100', source: 'Metacritic' }
              ]
            }
          },
          {
            id: 2,
            movieTitle: 'The Matrix',
            notes: 'A groundbreaking sci-fi classic',
            movie: {
              release: '1999-03-31T00:00:00.000Z',
              imdbRating: 8.7,
              genre: 'Sci-Fi',
              duration: '136 min',
              director: 'Lana Wachowski, Lilly Wachowski',
              actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
              writer: 'Lana Wachowski, Lilly Wachowski',
              ratings: [
                { value: '8.7/10', source: 'Internet Movie Database' },
                { value: '87%', source: 'Rotten Tomatoes' },
                { value: '73/100', source: 'Metacritic' }
              ]
            }
          }
        ]
      });
    });
  });

  describe('GET /movie-reviews/:id', () => {
    it('should return response with status OK and review data', async () => {
      // arrange
      const mockIdReview = 1;

      // act
      const response = await request(mockAppModule.getHttpServer())
        .get(`/movie-reviews/${mockIdReview}`);

      // assert
      expect(response.status).toBe(HttpStatus.OK.valueOf());
      expect(response.body).toEqual({
        message: 'Review found successfully',
        data: {
          id: mockIdReview,
          movieTitle: 'The Shawshank Redemption',
          notes: 'This movie is amazing',
          movie: {
            release: '1994-01-01T00:00:00.000Z',
            imdbRating: 9.3,
            genre: 'Drama',
            duration: '142 min',
            director: 'Frank Darabont',
            actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
            writer: 'Stephen King, Frank Darabont',
            ratings: [
              { value: '9.3/10', source: 'Internet Movie Database' },
              { value: '91%', source: 'Rotten Tomatoes' },
              { value: '80/100', source: 'Metacritic' }
            ]
          }
        }
      });
    });

    it('should return response with status NotFound and message Review not found', async () => {
      // arrange
      const mockIdReview = faker.number.int({ min: 50, max: 100 });

      // act
      const response = await request(mockAppModule.getHttpServer())
        .get(`/movie-reviews/${mockIdReview}`);

      // assert
      expect(response.status).toBe(HttpStatus.NOT_FOUND.valueOf());
      expect(response.body).toEqual({
        message: 'Review not found'
      });
    });

    it('should return response with status Bad Request because invalids value in id', async () => {
      // arrange
      const mockID = faker.lorem.word();

      // act
      const response = await request(mockAppModule.getHttpServer())
        .get(`/movie-reviews/${mockID}`);

      // assert
      expect(response.status).toBe(HttpStatus.BAD_REQUEST.valueOf());
      expect(response.body).toEqual({
        message: 'The value {{id}} is not a number'
      });
    });
  });
});

