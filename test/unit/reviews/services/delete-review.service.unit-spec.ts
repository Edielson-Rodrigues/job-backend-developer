import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IReviewRepository } from '../../../../src/reviews/repositories/review.repository.interface';
import { DeleteReviewService } from '../../../../src/reviews/services/delete-review.service';
import { generateReviewEntity } from '../../../utils/generators/review.generator';

describe('[Unit] DeleteReviewService', () => {
  let deleteReviewService: DeleteReviewService;
  let mockReviewRepository: jest.Mocked<IReviewRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteReviewService,
        {
          provide: 'IReviewRepository',
          useValue: {
            findOneById: jest.fn(),
            delete: jest.fn()
          }
        }
      ]
    }).compile();

    deleteReviewService = module.get<DeleteReviewService>(DeleteReviewService);
    mockReviewRepository = module.get('IReviewRepository');
  });

  describe('.execute()', () => {
    it('should return a message when the review is deleted successfully', async () => {
      // arrange
      const mockIdReview = faker.number.int();
      const mockReview = generateReviewEntity();
      mockReviewRepository.findOneById.mockResolvedValue(mockReview);
      mockReviewRepository.delete.mockResolvedValue(1);
      const expected = {
        message: 'Review deleted successfully'
      };

      // act
      const result = await deleteReviewService.execute(mockIdReview);

      // assert
      expect(result).toEqual(expected);
    });
    
    it('should throw NotFoundException when the review is not found by ID', async () => {
      // arrange
      const mocKIdReview = faker.number.int();
      mockReviewRepository.findOneById.mockResolvedValue(null);

      // act and assert
      expect(() => deleteReviewService.execute(mocKIdReview)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when the review is not deleted', async () => {
      // arrange
      const mockIdReview = faker.number.int();
      const mockReview = generateReviewEntity();
      mockReviewRepository.findOneById.mockResolvedValue(mockReview);
      mockReviewRepository.delete.mockResolvedValue(0);

      // act and assert
      expect(() => deleteReviewService.execute(mockIdReview)).rejects.toThrow(BadRequestException);
    });
  });
});