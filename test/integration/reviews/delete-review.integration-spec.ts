import * as request from 'supertest';
import { faker } from "@faker-js/faker/.";
import { HttpStatus } from '@nestjs/common';
import { mockAppModule } from "../../jest.integration-setup";

describe('[Integration] DeleteReview', () => {
  it('should return response with status OK and message Review deleted successfully', async () => {
    // arrange
    const mockIdReview = faker.number.int({ min: 1, max: 3 });
    const reviewsBefore = await request(mockAppModule.getHttpServer())
      .get(`/movie-reviews`);

    // act
    const response = await request(mockAppModule.getHttpServer())
      .delete(`/movie-reviews/${mockIdReview}`);

    const reviewAfter = await request(mockAppModule.getHttpServer())
      .get(`/movie-reviews`);
      
    // assert
    expect(response.status).toBe(HttpStatus.OK.valueOf());
    expect(response.body).toEqual({
      message: 'Review deleted successfully'
    });
    expect((reviewsBefore.body.data.length) - (reviewAfter.body.data.length)).toBe(1);
  });

  it('should return response with status Not Found and message Review not found', async () => {
    // arrange
    const mockIdReview = faker.number.int({ min: 50, max: 100 });

    // act
    const response = await request(mockAppModule.getHttpServer())
      .delete(`/movie-reviews/${mockIdReview}`);

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
      .delete(`/movie-reviews/${mockID}`);

    // assert
    expect(response.status).toBe(HttpStatus.BAD_REQUEST.valueOf());
    expect(response.body).toEqual({
      message: 'The value {{id}} is not a number'
    });
  });
});

