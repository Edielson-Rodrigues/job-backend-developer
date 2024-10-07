import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { mockAppModule } from '../../jest.integration-setup';
import { faker } from '@faker-js/faker/.';

describe('[Integration] GetViewsReview', () => {
  describe('GET /movie-reviews/views', () => {
    it('should return response with status OK and reviews with and pagination', async () => {
      // act
      const response = await request(mockAppModule.getHttpServer())
        .get('/movie-reviews/views');

      // assert
      expect(response.status).toBe(HttpStatus.OK.valueOf());
      expect(response.body).toEqual({
        message: 'Reviews found successfully',
        meta: {
          totalItems: 3,
          itemCount: 3,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1
        },
        data: [
          {
            id: 3,
            movieTitle: 'Inception',
            views: 9
          },
          {
            id: 2,
            movieTitle: 'The Matrix',
            views: 6
          },
          {
            id: 1,
            movieTitle: 'The Shawshank Redemption',
            views: 1
          },
        ]
      });
    });

    it('should return response with status OK and reviews sorted in ascending order', async () => {
      // act
      const response = await request(mockAppModule.getHttpServer())
        .get('/movie-reviews/views')
        .query({ order: 'asc' });

      // assert
      expect(response.status).toBe(HttpStatus.OK.valueOf());
      expect(response.body).toEqual({
        message: 'Reviews found successfully',
        meta: {
          totalItems: 3,
          itemCount: 3,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1
        },
        data: [
          {
            id: 1,
            movieTitle: 'The Shawshank Redemption',
            views: 1
          },
          {
            id: 2,
            movieTitle: 'The Matrix',
            views: 6
          },
          {
            id: 3,
            movieTitle: 'Inception',
            views: 9
          },
        ]
      });
    });

    it('should return response with status OK and reviews sorted in descending order', async () => {
      // act
      const response = await request(mockAppModule.getHttpServer())
        .get('/movie-reviews/views')
        .query({ order: 'desc' });
        
      // assert
      expect(response.status).toBe(HttpStatus.OK.valueOf());
      expect(response.body).toEqual({
        message: 'Reviews found successfully',
        meta: {
          totalItems: 3,
          itemCount: 3,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1
        },
        data: [
          {
            id: 3,
            movieTitle: 'Inception',
            views: 9
          },
          {
            id: 2,
            movieTitle: 'The Matrix',
            views: 6
          },
          {
            id: 1,
            movieTitle: 'The Shawshank Redemption',
            views: 1
          },
        ]
      });
    });

    it('should return response with status BadRequest because invalid value in order', async () => {
      // arrange
      const mockOrder = `${faker.lorem.word()}_1`;
      // act
      const response = await request(mockAppModule.getHttpServer())
        .get('/movie-reviews/views')
        .query({ order: mockOrder });

      // assert
      expect(response.status).toBe(HttpStatus.BAD_REQUEST.valueOf());
      expect(response.body).toEqual({
        message: `The value {{${mockOrder}}} is not a valid argument for the {{order}}`,
        data: {
          validArguments: ['ASC', 'DESC']
        }
      });
    });
  });
});
