import * as request from 'supertest';
import { faker } from "@faker-js/faker/.";
import { mockAppModule } from "../jest.integration-setup";
import { HttpStatus } from '@nestjs/common';
import { generateReviewEntity } from '../utils/generators/review.generator';

describe('[Integration] UpdateReview', () => {
  it('should return response with status OK and review updated successfully', async () => {
    // arrange
    const mockIdReview = faker.number.int({ min: 1, max: 3 });
    const mockReviewToUpdate = generateReviewEntity();
    delete mockReviewToUpdate.id;
    delete mockReviewToUpdate.createdAt;
    delete mockReviewToUpdate.updatedAt;
    delete mockReviewToUpdate.views;

    // act
    const response = await request(mockAppModule.getHttpServer())
      .put(`/movie-reviews/${mockIdReview}`)
      .send(mockReviewToUpdate);

    // assert
    expect(response.status).toBe(HttpStatus.OK.valueOf());

    expect(response.body).toEqual({
      message: 'Review updated successfully',
      data: {
        id: mockIdReview,
        movieTitle: mockReviewToUpdate.title,
        notes: mockReviewToUpdate.notes,
        movie: {
          release: mockReviewToUpdate.releaseDate.toISOString(),
          imdbRating: mockReviewToUpdate.imdbRating,
          genre: mockReviewToUpdate.genre,
          duration: mockReviewToUpdate.duration,
          director: mockReviewToUpdate.director,
          actors: mockReviewToUpdate.actors,
          writer: mockReviewToUpdate.writer,
          ratings: mockReviewToUpdate.ratings
        }
      }
    });
  });

  it('should return response with status NotFound and message Review not found', async () => {
    // arrange
    const mocKIdReview = faker.number.int({ min: 50, max: 100 });
    const mockReviewToUpdate = generateReviewEntity();
    delete mockReviewToUpdate.id;
    delete mockReviewToUpdate.createdAt;
    delete mockReviewToUpdate.updatedAt;
    delete mockReviewToUpdate.views;

    // act
    const response = await request(mockAppModule.getHttpServer())
      .put(`/movie-reviews/${mocKIdReview}`)
      .send(mockReviewToUpdate);

    // assert
    expect(response.status).toBe(HttpStatus.NOT_FOUND.valueOf());
    expect(response.body).toEqual({
      message: 'Review not found'
    });
  });

  it('should return response with status BadRequest because invalids value in id', async () => {
    // arrange
    const mockID = faker.lorem.word();

    // act
    const response = await request(mockAppModule.getHttpServer())
      .put(`/movie-reviews/${mockID}`);

    // assert
    expect(response.status).toBe(HttpStatus.BAD_REQUEST.valueOf());
    expect(response.body).toEqual({
      message: 'The value {{id}} is not a number'
    });
  });

  it('should return response with status BadRequest because invalids value in body', async () => {
    // arrange
    const mockIdReview = faker.number.int({ min: 1, max: 3 });
    const mockReviewToUpdate = generateReviewEntity();
    delete mockReviewToUpdate.title;
    // act
    const response = await request(mockAppModule.getHttpServer())
    .put(`/movie-reviews/${mockIdReview}`)
    .send(mockReviewToUpdate);
    
    // assert
    expect(response.status).toBe(HttpStatus.BAD_REQUEST.valueOf());
    expect(response.body).toEqual({
      message: [
        'property id should not exist',
        'property views should not exist',
        'property createdAt should not exist',
        'property updatedAt should not exist',
        'Title is too long',
        'Title is required'
      ],
      error: 'Bad Request',
      statusCode: 400
    });
  });
});

