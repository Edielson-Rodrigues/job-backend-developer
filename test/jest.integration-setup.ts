import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { IMovieProvider } from "../src/movies/movie.provider.interface";

export const mockMovieProvider: jest.Mocked<IMovieProvider> = {
  getByTitle: jest.fn(),
  getById: jest.fn()
};

let mockAppModule: INestApplication;

beforeAll(async () => {
  process.env.ENVIRONMENT = 'test';
  const testingModule = await Test.createTestingModule({
    imports: [
      AppModule
    ]
  })
  .overrideProvider('IMovieProvider')
  .useValue(mockMovieProvider)
  .compile();
  
  mockAppModule = testingModule.createNestApplication();
  mockAppModule.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  await mockAppModule.init();
});

afterAll(async () => {
  if (mockAppModule) {
    await mockAppModule.close();
  }
});

export { mockAppModule };
