import { Test } from "@nestjs/testing";
import { GetViewsReviewService } from "../../../../src/reviews/services/get-views-review.service";
import { generateReviewEntity } from "../../../utils/generators/review.generator";
import { IReviewRepository } from '../../../../src/reviews/repositories/review.repository.interface';

describe('[Unit] GetViewsReviewService', () => {
  let getViewsReviewService: GetViewsReviewService;
  let mockReviewRepository: jest.Mocked<IReviewRepository>;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetViewsReviewService,
        {
          provide: 'IReviewRepository',
          useValue: {
            find: jest.fn()
          }
        }
      ]
    }).compile();

    getViewsReviewService = module.get<GetViewsReviewService>(GetViewsReviewService);
    mockReviewRepository = module.get('IReviewRepository');
  });

  describe('.execute()', () => {
    it('should return the total views of all reviews', async () => {
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
      const argumentsPagination = {
        page: 1,
        limit: 10
      };
      mockReviewRepository.find.mockResolvedValue(mockReturnRepository);

      // act
      const result = await getViewsReviewService.execute(
        argumentsPagination,
        'ASC'
      );

      // assert
      expect(result).toEqual({
        message: 'Reviews found successfully',
        meta: mockMeta,
        data: mocksReviews.map(review => ({
          id: review.id,
          movieTitle: review.title,
          views: review.views
        }))
      });
    });
  });
});