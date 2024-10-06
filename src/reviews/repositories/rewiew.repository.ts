import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReviewEntity } from "../entity/review.entity";
import { Repository } from "typeorm";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { IReviewRepository, ReviewFilters } from "./review.repository.interface";

@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>
  ) {}

  async create(review: ReviewEntity): Promise<ReviewEntity> {
    return await this.reviewRepository.save(review);
  }

  async find(argumentsPagination: IPaginationOptions, filters: ReviewFilters): Promise<Pagination<ReviewEntity>> {
    const queryBuilder = this.reviewRepository.createQueryBuilder("review");
    if (filters.filter) {
      queryBuilder
        .where("review.title LIKE :filter", { filter: `%${filters.filter}%` })
        .orWhere("review.actors LIKE :filter", { filter: `%${filters.filter}%` })
        .orWhere("review.director LIKE :filter", { filter: `%${filters.filter}%` });
    }
    if (filters.order && filters.orderBy) {
      queryBuilder.orderBy(`review.${filters.orderBy}`, filters.order);
    }

    return await paginate<ReviewEntity>(queryBuilder, argumentsPagination);
  }
  
  async findOneById(id: number): Promise<ReviewEntity> {
    return await this.reviewRepository.findOne({ where: { id } });
  }

  async update(id: number, review: ReviewEntity): Promise<ReviewEntity> {
    await this.reviewRepository.update({ id }, review);
    return this.reviewRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<number> {
    const { affected } = await this.reviewRepository.delete({
      id
    });

    return affected;
  }
}
