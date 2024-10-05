import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReviewEntity } from "../entity/review.entity";
import { Repository } from "typeorm";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>
  ) {}

  async create(review: ReviewEntity): Promise<ReviewEntity> {
    return await this.reviewRepository.save(review);
  }

  async find(filters?: IPaginationOptions): Promise<Pagination<ReviewEntity>> {
    const queryBuilder = this.reviewRepository.createQueryBuilder("review");

    return await paginate<ReviewEntity>(queryBuilder, filters);
  }
  
  async findOneById(id: number): Promise<ReviewEntity> {
    return await this.reviewRepository.findOne({ where: { id } });
  }

  async update(id: number, review: ReviewEntity): Promise<ReviewEntity> {
    await this.reviewRepository.update(id, review);
    return this.reviewRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<number> {
    const { affected } = await this.reviewRepository.delete({
      id
    });

    return affected;
  }
}
