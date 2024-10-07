import { TypeOrmModule } from "@nestjs/typeorm";
import { Test } from "@nestjs/testing";
import { TypeORMConfigTest } from "../src/config/typeorm.config";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { IMovieProvider } from "../src/movies/movie.provider.interface";

export const mockMovieProvider: jest.Mocked<IMovieProvider> = {
  getByTitle: jest.fn(),
  getById: jest.fn()
};

let mockAppModule: INestApplication;

beforeAll(async () => {
  const testingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync(TypeORMConfigTest),
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

  // const connection = testingModule.get<DataSource>(DataSource);
  // await connection.runMigrations();
});

afterAll(async () => {
  if (mockAppModule) {
    await mockAppModule.close();
  }
});

export { mockAppModule };
