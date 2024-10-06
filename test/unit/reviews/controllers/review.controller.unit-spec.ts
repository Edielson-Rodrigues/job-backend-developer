import { faker } from "@faker-js/faker/.";
import { Test } from "@nestjs/testing";
import { ReviewController } from "../../../../src/reviews/controllers/review.controller";
import { CreateReviewService } from "../../../../src/reviews/services/create-review.service";
import { DeleteReviewService } from "../../../../src/reviews/services/delete-review.service";
import { GetReviewService } from "../../../../src/reviews/services/get-review.service";
import { UpdateReviewService } from "../../../../src/reviews/services/update-review.service";
import { PaginationReviewResponseDTO } from "../../../../src/reviews/dtos/pagination-review.dto";

describe('[Unit] ReviewController', () => {
  let reviewController: ReviewController;
  let mockCreateReviewService: jest.Mocked<CreateReviewService>;
  let mockUpdateReviewService: jest.Mocked<UpdateReviewService>;
  let mockDeleteReviewService: jest.Mocked<DeleteReviewService>;
  let mockGetReviewService: jest.Mocked<GetReviewService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: CreateReviewService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: UpdateReviewService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: DeleteReviewService,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: GetReviewService,
          useValue: {
            byId: jest.fn(),
            all: jest.fn()
          }
        }
      ]
    }).compile();

    reviewController = module.get<ReviewController>(ReviewController);
    mockCreateReviewService = module.get(CreateReviewService);
    mockUpdateReviewService = module.get(UpdateReviewService);
    mockDeleteReviewService = module.get(DeleteReviewService);
    mockGetReviewService = module.get(GetReviewService);
  });

  describe('.create()', () => {
    it('should to call CreateReviewService with correct params', async () => {
      // arrange
      const mockReview = {
        notes: faker.lorem.paragraph(),
        title: faker.lorem.word()
      };
      const mockReviewResponse = {
        message: 'Review created successfully',
        data: {
          id: faker.number.int(),
          movieTitle: mockReview.title,
          notes: mockReview.notes,
          movie: {
            release: faker.date.recent(),
            imdbRating: faker.number.int(),
            genre: faker.lorem.word(),
            duration: faker.helpers.arrayElement(['120 min', '150 min', '180 min']),
            director: faker.person.fullName(),
            actors: faker.person.fullName(),
            writer: faker.person.firstName(),
            ratings: [
              {
                source: faker.internet.domainName(),
                value: `${faker.number.float({ min: 0, max: 100})} / 100`
              }
            ]
          }
        }
      };
      mockCreateReviewService.execute.mockResolvedValue(mockReviewResponse);

      // act
      await reviewController.create(mockReview);

      // assert
      expect(mockCreateReviewService.execute).toHaveBeenCalledWith(mockReview);
      expect(mockCreateReviewService.execute).toHaveBeenCalledTimes(1);
      expect(mockReviewResponse).toEqual(mockReviewResponse);
    });
  });

  describe('.update()', () => {
    it('should to call UpdateReviewService with correct params', async () => {
      // arrange
      const mockId = faker.number.int();
      const mockReview = {
        notes: faker.lorem.paragraph(),
        title: faker.lorem.word(),
        releaseDate: faker.date.recent(),
        imdbRating: faker.number.int(),
        genre: faker.lorem.word(),
        duration: faker.helpers.arrayElement(['120 min', '150 min', '180 min']),
        director: faker.person.fullName(),
        actors: faker.person.fullName(),
        writer: faker.person.firstName(),
        ratings: [
          {
            source: faker.internet.domainName(),
            value: `${faker.number.float({ min: 0, max: 100})} / 100`
          }
        ]
      };
      const mockReviewResponse = {
        message: 'Review updated successfully',
        data: {
          id: faker.number.int(),
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
      };
      mockUpdateReviewService.execute.mockResolvedValue(mockReviewResponse);

      // act
      await reviewController.update(mockId, mockReview);

      // assert
      expect(mockUpdateReviewService.execute).toHaveBeenCalledWith(mockId, mockReview);
      expect(mockUpdateReviewService.execute).toHaveBeenCalledTimes(1);
      expect(mockReviewResponse).toEqual(mockReviewResponse);
    });
  });

  describe('.delete()', () => {
    it('should to call DeleteReviewService with correct params', async () => {
      // arrange
      const mockId = faker.number.int();
      const mockReviewResponse = {
        message: 'Review deleted successfully'
      };
      mockDeleteReviewService.execute.mockResolvedValue(mockReviewResponse);

      // act
      await reviewController.delete(mockId);

      // assert
      expect(mockDeleteReviewService.execute).toHaveBeenCalledWith(mockId);
      expect(mockDeleteReviewService.execute).toHaveBeenCalledTimes(1);
      expect(mockReviewResponse).toEqual(mockReviewResponse);
    });
  });

  describe('.getById()', () => {
    it('should to call GetReviewService.byId with correct params', async () => {
      // arrange
      const mockId = faker.number.int();
      const mockReviewResponse = {
        message: 'Review deleted successfully',
        data: {
          id: faker.number.int(),
          movieTitle: faker.lorem.word(),
          notes: faker.lorem.paragraph(),
          movie: {
            release: faker.date.recent(),
            imdbRating: faker.number.int(),
            genre: faker.lorem.word(),
            duration: faker.helpers.arrayElement(['120 min', '150 min', '180 min']),
            director: faker.person.fullName(),
            actors: faker.person.fullName(),
            writer: faker.person.firstName(),
            ratings: [
              {
                source: faker.internet.domainName(),
                value: `${faker.number.float({ min: 0, max: 100})} / 100`
              }
            ]
          }
        }
      };
      mockGetReviewService.byId.mockResolvedValue(mockReviewResponse);

      // act
      await reviewController.getById(mockId);

      // assert
      expect(mockGetReviewService.byId).toHaveBeenCalledWith(mockId);
      expect(mockGetReviewService.byId).toHaveBeenCalledTimes(1);
      expect(mockReviewResponse).toEqual(mockReviewResponse);
    });
  });

  describe('.get()', () => {
    it('should to call GetReviewService.all with correct params', async () => {
      const mockReviewResponse: PaginationReviewResponseDTO = {
        message: 'Review deleted successfully',
        meta: {
          itemCount: 1,
          totalItems: 1,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1
        },
        data: [
          {
            id: faker.number.int(),
            movieTitle: faker.lorem.word(),
            notes: faker.lorem.paragraph(),
            movie: {
              release: faker.date.recent(),
              imdbRating: faker.number.int(),
              genre: faker.lorem.word(),
              duration: faker.helpers.arrayElement(['120 min', '150 min', '180 min']),
              director: faker.person.fullName(),
              actors: faker.person.fullName(),
              writer: faker.person.firstName(),
              ratings: [
                {
                  source: faker.internet.domainName(),
                  value: `${faker.number.float({ min: 0, max: 100})} / 100`
                }
              ]
            }
          }
        ]
      };
      mockGetReviewService.all.mockResolvedValue(mockReviewResponse);
      const mockPage = faker.number.int({ min: 1, max: 10 });
      const mockLimit = faker.number.int({ min: 1, max: 100 });
      const mockFilter = faker.lorem.word();
      const mockOrderBy = faker.helpers.arrayElement(['releasedDate', 'imdbRating']);
      const mockOrder = faker.helpers.arrayElement(['ASC', 'DESC']);

      // act
      await reviewController.get(
        mockPage,
        mockLimit,
        mockFilter,
        mockOrderBy,
        mockOrder
      );

      // assert
      expect(mockGetReviewService.all).toHaveBeenCalledWith(
        { page: mockPage, limit: mockLimit },
        { filter: mockFilter, orderBy: mockOrderBy, order: mockOrder }
      );
      expect(mockGetReviewService.all).toHaveBeenCalledTimes(1);
      expect(mockReviewResponse).toEqual(mockReviewResponse);
    });
  });
});