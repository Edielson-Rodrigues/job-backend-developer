import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { ReviewEntity } from "../entity/review.entity";

export type ReviewFilters = {
  filter: string;
  sort: string;
  order: string;
};

export interface IReviewRepository {
  /**
   * @description Create a review
   * @param {{ReviewEntity}} review 
   * @returns {Promise<ReviewEntity>}
   */
  create(review: ReviewEntity): Promise<ReviewEntity>;

  /**
   * @description Find all reviews
   * @param {IPaginationOptions} argumentsPagination 
   * @param {ReviewFilters} filters 
   * @returns {Promise<Pagination<ReviewEntity>>}
   */
  find(argumentsPagination: IPaginationOptions, filters: ReviewFilters): Promise<Pagination<ReviewEntity>>;

  /**
   * @description Find a review by id
   * @param {number} id 
   * @returns {Promise<ReviewEntity>}
   */
  findOneById(id: number): Promise<ReviewEntity>;

  /**
   * @description Update a review
   * @param {number} id 
   * @param {ReviewEntity} review 
   * @returns {Promise<ReviewEntity>}
   */
  update(id: number, review: ReviewEntity): Promise<ReviewEntity>;

  /**
   * @description Delete a review
   * @param {number} id 
   * @returns {Promise<number>}
   */
  delete(id: number): Promise<number>;
}