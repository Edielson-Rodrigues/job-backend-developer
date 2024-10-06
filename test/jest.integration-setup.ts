import { TypeOrmModule } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TypeORMConfigTest } from "../src/config/typeorm.config";

let mockAppModule: TestingModule;

beforeAll(async () => {
  mockAppModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync(TypeORMConfigTest),
      AppModule,
    ]
  }).compile();
});

afterAll(async () => {
  if (mockAppModule) {
    await mockAppModule.close();
  }
});

export { mockAppModule };
