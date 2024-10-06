import { Test } from "@nestjs/testing";
import { faker } from "@faker-js/faker/.";
import { UpdateReviewService } from "../../../../src/reviews/services/update-review.service";
import { IReviewRepository } from "../../../../src/reviews/repositories/review.repository.interface";
import { generateReviewEntity } from "../../../utils/generators/review.generator";
import { NotFoundException } from "@nestjs/common";

describe('[Unit] UpdateReviewService', () => {
  let updateReviewService: UpdateReviewService;
  let mockReviewRepository: jest.Mocked<IReviewRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateReviewService,
        {
          provide: "IReviewRepository",
          useValue: {
            findOneById: jest.fn(),
            update: jest.fn()
          }
        }
      ]
    }).compile();

    updateReviewService = module.get<UpdateReviewService>(UpdateReviewService);
    mockReviewRepository = module.get("IReviewRepository");
  });
  
  describe('.execute()', () => {
    it('should return the review with type ReviewResponseDTO and with fields updated', async () => {
      // arrange
      const mockIdReview = faker.number.int();
      const mockReview = generateReviewEntity();
      const mockNewValues = generateReviewEntity();

      delete mockNewValues.id;
      delete mockNewValues.createdAt;
      delete mockNewValues.updatedAt;
      delete mockNewValues.views;

      const mockReviewUpdated = {
        ...mockReview,
        ...mockNewValues,
        updatedAt: new Date()
      };
      mockReviewRepository.findOneById.mockResolvedValue(mockReview);
      mockReviewRepository.update.mockResolvedValue(mockReviewUpdated);
      const mockResult = {
        message: "Review updated successfully",
        data: {
          id: mockReviewUpdated.id,
          movieTitle: mockReviewUpdated.title,
          notes: mockReviewUpdated.notes,
          movie: {
            release: mockReviewUpdated.releaseDate,
            imdbRating: mockReviewUpdated.imdbRating,
            genre: mockReviewUpdated.genre,
            duration: mockReviewUpdated.duration,
            director: mockReviewUpdated.director,
            actors: mockReviewUpdated.actors,
            writer: mockReviewUpdated.writer,
            ratings: mockReviewUpdated.ratings
          }
        }
      };

      // act
      const result = await updateReviewService.execute(mockIdReview, mockReview);

      // assert
      expect(result).toEqual(mockResult);
    })

    it('should throw NotFoundException when the review is not found by ID', async () => {
      // arrange
      const mockIdReview = faker.number.int();
      mockReviewRepository.findOneById.mockResolvedValue(null);

      // act and assert
      await expect(() => updateReviewService.execute(mockIdReview, generateReviewEntity())).rejects.toThrow(NotFoundException);
    });
  });
});