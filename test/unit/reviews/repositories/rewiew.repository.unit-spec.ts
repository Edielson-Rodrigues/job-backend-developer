import { Test } from "@nestjs/testing";
import { faker } from "@faker-js/faker/.";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { IReviewRepository } from "../../../../src/reviews/repositories/review.repository.interface";
import { ReviewRepository } from "../../../../src/reviews/repositories/rewiew.repository";
import { ReviewEntity } from "../../../../src/reviews/entity/review.entity";
import { generateReviewEntity } from "../../../utils/generators/review.generator";

const mockQueryBuilder: jest.Mocked<{ 
  where: jest.Mock,
  orWhere: jest.Mock,
  orderBy: jest.Mock
 }> = {
  where: jest.fn().mockReturnThis(),
  orWhere: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis()
}; 

jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn()
}))

describe('[Unit] ReviewRepository', () => {
  let reviewRepository: IReviewRepository;
  let mockTypeOrmRepository: jest.Mocked<Repository<ReviewEntity>>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        ReviewRepository,
        {
          provide: getRepositoryToken(ReviewEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            query: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder)
          }
        }
      ]
    }).compile();

    reviewRepository = module.get<IReviewRepository>(ReviewRepository);
    mockTypeOrmRepository = module.get(getRepositoryToken(ReviewEntity));
  });

  describe('.create()', () => {
    it('should call the create method of the typeOrmRepository with the correct params', async () => {
      // arrange
      const mockReviewEntity = generateReviewEntity();
      mockTypeOrmRepository.save.mockResolvedValue(mockReviewEntity);

      // act
      const result = await reviewRepository.create(mockReviewEntity);

      // assert
      expect(mockTypeOrmRepository.save).toHaveBeenCalledWith(mockReviewEntity);
      expect(mockTypeOrmRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockReviewEntity);
    });
  });

  describe('.find()', () => {
    it('should call the queryBuilder.where and queryBuilder.orWhere methods of the typeOrmRepository with the correct params', async () => {
      // arrange
      const mockReviews = [generateReviewEntity(), generateReviewEntity()];
      const mockFilters = {
        filter: faker.lorem.word(),
        order: faker.helpers.arrayElement(['ASC', 'DESC']),
        orderBy: faker.helpers.arrayElement(['releaseDate', 'rating'])
      };
      const mockPaginationOptions = {
        page: faker.number.int(),
        limit: faker.number.int()
      }
      mockTypeOrmRepository.find.mockResolvedValue(mockReviews);

      // act
      await reviewRepository.find(mockPaginationOptions, mockFilters);

      // assert
      expect(mockTypeOrmRepository.createQueryBuilder).toHaveBeenCalledWith('review');
      expect(mockTypeOrmRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'review.title LIKE :filter', { filter: `%${mockFilters.filter}%` }
      );
      expect(mockQueryBuilder.where).toHaveBeenCalledTimes(1);
      expect(mockQueryBuilder.orWhere).toHaveBeenCalledWith(
        'review.actors LIKE :filter', { filter: `%${mockFilters.filter}%` }
      );
      expect(mockQueryBuilder.orWhere).toHaveBeenCalledTimes(2);
    });

    it('should call the queryBuilder.orderBy method of the typeOrmRepository with the correct params', async () => {
      // arrange
      const mockReviews = [generateReviewEntity(), generateReviewEntity()];
      const mockFilters = {
        filter: faker.lorem.word(),
        order: faker.helpers.arrayElement(['ASC', 'DESC']),
        orderBy: faker.helpers.arrayElement(['releaseDate', 'rating'])
      };
      const mockPaginationOptions = {
        page: faker.number.int(),
        limit: faker.number.int()
      }
      mockTypeOrmRepository.find.mockResolvedValue(mockReviews);

      // act
      await reviewRepository.find(mockPaginationOptions, mockFilters);

      // assert
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(`review.${mockFilters.orderBy}`, mockFilters.order);
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledTimes(1);
    });
  });

  describe('.findOneById()', () => {
    it('should call the findOne method of the typeOrmRepository with the correct params', async () => {
      // arrange
      const mockId = faker.number.int();
      const mockReviewEntity = generateReviewEntity();
      mockTypeOrmRepository.findOne.mockResolvedValue(mockReviewEntity);

      // act
      const result = await reviewRepository.findOneById(mockId);

      // assert
      expect(mockTypeOrmRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockId }
      });
      expect(mockTypeOrmRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockReviewEntity);
    });
  });

  describe('.update()', () => {
    it('should call the update method of the typeOrmRepository with the correct params', async () => {
      // arrange
      const mockId = faker.number.int();
      const mockReviewEntity = generateReviewEntity();
      mockTypeOrmRepository.update.mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });
      mockTypeOrmRepository.findOne.mockResolvedValue(mockReviewEntity);
      // act
      const result = await reviewRepository.update(mockId, mockReviewEntity);

      // assert
      expect(mockTypeOrmRepository.update).toHaveBeenCalledWith({ id: mockId }, mockReviewEntity);
      expect(mockTypeOrmRepository.update).toHaveBeenCalledTimes(1);
      expect(mockTypeOrmRepository.findOne).toHaveBeenCalledWith({ where: { id: mockId } });
      expect(result).toEqual(mockReviewEntity);
    });
  });

  describe('.delete()', () => {
    it('should call the delete method of the typeOrmRepository with the correct params', async () => {
      // arrange
      const mockId = faker.number.int();
      mockTypeOrmRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

      // act
      const result = await reviewRepository.delete(mockId);

      // assert
      expect(mockTypeOrmRepository.delete).toHaveBeenCalledWith({ id: mockId });
      expect(mockTypeOrmRepository.delete).toHaveBeenCalledTimes(1);
      expect(result).toBe(1);
    });
  });

  describe('.updateViews()', () => {
    it('should call the query method of the typeOrmRepository with the correct params', async () => {
      // arrange
      const mockValues = [
        { id: faker.number.int(), views: faker.number.int() },
        { id: faker.number.int(), views: faker.number.int() }
      ];
      mockTypeOrmRepository.query.mockResolvedValue(null);

      // act
      const result = await reviewRepository.updateViews(mockValues);

      // assert
      expect(mockTypeOrmRepository.query).toHaveBeenCalledWith(
        `UPDATE review SET views = ${mockValues[0].views} WHERE id = ${mockValues[0].id};` +
        `UPDATE review SET views = ${mockValues[1].views} WHERE id = ${mockValues[1].id};`
      );
      expect(mockTypeOrmRepository.query).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockValues.length);
    });
  });
});