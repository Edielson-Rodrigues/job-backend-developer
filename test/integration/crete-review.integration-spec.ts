import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { mockAppModule } from '../jest.integration-setup';

let appModule: INestApplication;

describe('[Integration] CreateReview', () => {
  beforeAll(async () => {
    appModule = await mockAppModule.createNestApplication().init();
  });

  afterAll(async () => {
    await appModule.close();
  });
  
  it('should teste', async () => {
    return request(appModule.getHttpServer())
    .get('/movie-reviews')
    .expect(200)
  });
});