import { Test } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { faker } from "@faker-js/faker/.";
import { IReviewRepository } from "../../../../src/reviews/repositories/review.repository.interface";
import { CreateReviewService } from "../../../../src/reviews/services/create-review.service";
import { AllInformationMovie, IMovieProvider, MovieData } from "../../../../src/movies/movie.provider.interface";
import { ReviewEntity } from "../../../../src/reviews/entity/review.entity";

describe('[Unit] CreateReviewService', () => {
  let createReviewService: CreateReviewService;
  let mockReviewRepository: jest.Mocked<IReviewRepository>;
  let mockMovieProvider: jest.Mocked<IMovieProvider>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers:[
        CreateReviewService,
        {
          provide: "IReviewRepository",
          useValue: {
            create: jest.fn()
          }
        },
        {
          provide: "IMovieProvider",
          useValue: {
            getByTitle: jest.fn(),
            getById: jest.fn()
          }
        }
      ]
    }).compile();

    createReviewService = module.get<CreateReviewService>(CreateReviewService);
    mockReviewRepository = module.get("IReviewRepository");
    mockMovieProvider = module.get("IMovieProvider");
  });

  describe('.execute()', () => {
    it('should return the review with type ReviewResponseDTO when the movie is found by title and be one perfect match', async () => {
      // arrange
      const mockReview = {
        title: 'The Lord of the Rings: The Two Towers',
        notes: faker.lorem.paragraph()
      };
      const mockTtiles = [
        'The Lord of the Rings: The Two Towers',
        'The Lord of the Rings: The Return of the King',
        'The Lord of the Rings: The Fellowship of the Ring'
      ];
      const mockMovies: MovieData[] = [
        {
          imdbID: crypto.randomUUID(),
          Title: mockTtiles[0],
          Year: faker.date.past().getFullYear().toString(),
          Type: 'movie',
          Poster: faker.image.url()
        },
        {
          imdbID: crypto.randomUUID(),
          Title: mockTtiles[1],
          Year: faker.date.past().getFullYear().toString(),
          Type: 'movie',
          Poster: faker.image.url()
        },
        {
          imdbID: crypto.randomUUID(),
          Title: mockTtiles[2],
          Year: faker.date.past().getFullYear().toString(),
          Type: 'movie',
          Poster: faker.image.url()
        }
      ];
      const mockAllInformationMovie: AllInformationMovie = {
        Actors: faker.person.fullName(),
        Director: faker.person.fullName(),
        Genre: faker.helpers.arrayElement(['Action', 'Adventure', 'Drama']),
        imdbRating: faker.number.float({ min: 0, max: 10 }).toString(),
        Ratings: [
          {
            Source: faker.lorem.word(),
            Value: faker.lorem.word()
          }
        ],
        Released: faker.date.past().toString(),
        Runtime: faker.helpers.arrayElement(['120 min', '150 min', '180 min']),
        Writer: faker.person.fullName()        
      };
      mockMovieProvider.getByTitle.mockResolvedValue(mockMovies);
      mockMovieProvider.getById.mockResolvedValue(mockAllInformationMovie);
      
      const mockReviewSaved = new ReviewEntity({
        id: faker.number.int(),
        title: mockMovies[0].Title,
        notes: mockReview.notes,
        releaseDate: new Date(mockAllInformationMovie.Released),
        imdbRating: Number(mockAllInformationMovie.imdbRating),
        genre: mockAllInformationMovie.Genre,
        duration: mockAllInformationMovie.Runtime,
        director: mockAllInformationMovie.Director,
        actors: mockAllInformationMovie.Actors,
        views: 0,
        writer: mockAllInformationMovie.Writer,
        ratings: mockAllInformationMovie.Ratings.map(rating => ({ source: rating.Source, value: rating.Value })),
        createdAt: new Date(),
        updatedAt: null
      });
      mockReviewRepository.create.mockResolvedValue(mockReviewSaved);
      const resultMock = {
        message: 'Review created successfully',
        data: {
          id: mockReviewSaved.id,
          movieTitle: mockReviewSaved.title,
          notes: mockReviewSaved.notes,
          movie: {
            release: mockReviewSaved.releaseDate,
            imdbRating: mockReviewSaved.imdbRating,
            genre: mockReviewSaved.genre,
            duration: mockReviewSaved.duration,
            director: mockReviewSaved.director,
            actors: mockReviewSaved.actors,
            writer: mockReviewSaved.writer,
            ratings: mockReviewSaved.ratings
          }
        }
      };

      // act
      const result = await createReviewService.execute(mockReview);

      // assert
      expect(result).toEqual(resultMock);
    });

    it('should throw NotFoundException with a list of Movies with title similar when the movie is not found by title, but there are similar titles', async () => {
      // arrange
      const mockReview = {
        title: 'The Lord of the Rings',
        notes: faker.lorem.paragraph()
      };
      const mockTitles = [
        'The Lord of the Rings: The Two Towers',
        'The Lord of the Rings: The Return of the King',
        'The Lord of the Rings: The Fellowship of the Ring'
      ];
      const mockSimilarMovies: MovieData[] = [
        {
          imdbID: crypto.randomUUID(),
          Title: mockTitles[0],
          Year: faker.date.past().getFullYear().toString(),
          Type: 'movie',
          Poster: faker.image.url()
        },
        {
          imdbID: crypto.randomUUID(),
          Title: mockTitles[1],
          Year: faker.date.past().getFullYear().toString(),
          Type: 'movie',
          Poster: faker.image.url()
        },
        {
          imdbID: crypto.randomUUID(),
          Title: mockTitles[2],
          Year: faker.date.past().getFullYear().toString(),
          Type: 'movie',
          Poster: faker.image.url()
        }
      ];
      mockMovieProvider.getByTitle.mockResolvedValue(mockSimilarMovies);
      const resultMock = {
        message: 'Movie not found',
        data: {
          similarMovies: mockSimilarMovies.map(movie => movie.Title)
        }
      };

      // act and assert
      try {
        await createReviewService.execute(mockReview);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.response).toEqual(resultMock);
      }
    });
    
    it('should throw NotFoundException when movie not found by title and not have similar titles', async () => {
      // arrange
      const mockReview = {
        title: faker.lorem.word(),
        notes: faker.lorem.paragraph()
      };
      mockMovieProvider.getByTitle.mockResolvedValue(null);

      // act and assert
      expect(() => createReviewService.execute(mockReview)).rejects.toThrow(NotFoundException);
    });
  });
});