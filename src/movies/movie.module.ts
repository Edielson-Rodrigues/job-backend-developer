import { Module } from '@nestjs/common';
import { OmdbProvider } from './omdb.provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [{
    provide: 'IMovieProvider',
    useClass: OmdbProvider
  }],
  exports: [{
    provide: 'IMovieProvider',
    useClass: OmdbProvider
  }]
}) 
export class MovieModule {}
