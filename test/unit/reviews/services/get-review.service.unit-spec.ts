import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { GetReviewService } from '../../../../src/reviews/services/get-review.service';
import { IReviewRepository } from '../../../../src/reviews/repositories/review.repository.interface';
import { generateReviewEntity } from '../../../utils/generators/review.generator';
import { NotFoundException } from '@nestjs/common';

describe('[Unit] GetReviewService', () => {
  let getReviewService: GetReviewService;
  let mockReviewRepository: jest.Mocked<IReviewRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetReviewService,
        {
          provide: 'IReviewRepository',
          useValue: { 
            findOneById: jest.fn(),
            find: jest.fn()
          }
        }
      ]
    }).compile();

    getReviewService = module.get<GetReviewService>(GetReviewService);
    mockReviewRepository = module.get('IReviewRepository');
  });

  describe('.byId()',  () => {
    it('should return the review with type ReviewResponseDTO when the ID is valid and the review is found', async () => {
      // arrange
      const id = faker.number.int();
      const mockReview = generateReviewEntity();
      mockReviewRepository.findOneById.mockResolvedValue(mockReview);
      const expected = {
        message: 'Review found successfully',
        data: {
          id: mockReview.id,
          movieTitle: mockReview.title,
          notes: mockReview.notes,
          movie: {
            release: mockReview.releaseDate,
            imdbRating: mockReview.imdbRating,
            genre: mockReview.genre,
            duration: mockReview.duration,
            director: mockReview.director,
            actors: mockReview.actors,
            writer: mockReview.writer,
            ratings: mockReview.ratings
          }
        }
      }

      // act
      const result = await getReviewService.byId(id);
      
      // assert
      expect(result).toEqual(expected);
    })

    it('should throw NotFoundException when the review is not found by ID', async () => {
      // arrange 
      const id = faker.number.int();
      mockReviewRepository.findOneById.mockResolvedValue(null);

      // act and assert
      await expect(() => getReviewService.byId(id)).rejects.toThrow(NotFoundException);
    })
  });

  describe('.all()', () => {
    it('should return the review with PaginationReviewResponseDTO', async () => {
      // arrange 
      const mocksReviews = [
        generateReviewEntity(),
        generateReviewEntity()
      ];
      const mockMeta = {
        itemCount: 2,
        totalItems: 2,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1
      };
      const mockReturnRepository = {
        meta: mockMeta,
        items: mocksReviews
      };
      mockReviewRepository.find.mockResolvedValue(mockReturnRepository);

      // act
      const result = await getReviewService.all({ page: 1, limit: 10 }, {
        filter: 'filter',
        orderBy: 'rating',
        order: 'ASC'
      });
      
      // assert
      expect(result).toEqual({
        message: 'Reviews found successfully',
        meta: mockMeta,
        data: mocksReviews.map(review => {
          return {
            id: review.id,
            movieTitle: review.title,
            notes: review.notes,
            movie: {
              release: review.releaseDate,
              imdbRating: review.imdbRating,
              genre: review.genre,
              duration: review.duration,
              director: review.director,
              actors: review.actors,
              writer: review.writer,
              ratings: review.ratings
            }
          }
        })
      });
    });
  });
}); 