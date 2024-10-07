import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movies/movie.module';
import { ReviewModule } from './reviews/review.module';
import { getConfigTypeOrm } from './infra/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => getConfigTypeOrm(process.env.ENVIRONMENT).useFactory()
    }),
    ReviewModule,
    MovieModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

