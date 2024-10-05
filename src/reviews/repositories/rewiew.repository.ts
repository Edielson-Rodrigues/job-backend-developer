import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReviewEntity } from "../entity/review.entity";
import { FindManyOptions, Repository } from "typeorm";

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>
  ) {}

  async create(review: ReviewEntity): Promise<ReviewEntity> {
    return await this.reviewRepository.save(review);
  }

  async find(filters?: FindManyOptions<ReviewEntity>): Promise<ReviewEntity[]> {
    return await this.reviewRepository.find(filters);
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
