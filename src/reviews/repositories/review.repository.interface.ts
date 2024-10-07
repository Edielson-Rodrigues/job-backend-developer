import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { ReviewEntity } from "../entity/review.entity";

export type ReviewFilters = {
  filter: string;
  orderBy: "releaseDate" | "rating" | "views";
  order: "ASC" | "DESC";
};

export type UpdateViewsDTO = {
  id: number, 
  views: number
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
   * @description Update views of reviews
   * @param {Array<{ id: number, views: number }>} values
   *
   * @returns {Promise<number>} 
   */
  updateViews(values: Array<UpdateViewsDTO>): Promise<number>;

  /**
   * @description Delete a review
   * @param {number} id 
   * @returns {Promise<number>}
   */
  delete(id: number): Promise<number>;
}