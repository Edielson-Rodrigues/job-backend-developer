import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IReview, Rating } from "./review.interface";

@Entity({ name: 'review' })
export class ReviewEntity implements IReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'movie_title',
    length: 255,
    nullable: false
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false
  })
  notes: string;
  
  @Column({
    name: 'movie_release_date',
    nullable: true
  })
  releaseDate: Date;

  @Column({
    type: 'float',
    name: 'movie_imdb_rating',
    nullable: true
  })
  imdbRating: number;

  @Column({
    name: "movie_genre",
    length: 255,
    nullable: false
  })
  genre: string;

  @Column({
    name: 'movie_duration',
    nullable: false
  })
  duration: string;

  @Column({
    name: 'movie_director',
    type: 'varchar',
    length: 255,
    nullable: false
  })
  director: string;

  @Column({
    name: 'movie_actors',
    length: 255,
    nullable: false
  })
  actors: string;

  @Column({
    name: 'movie_writer',
    type: 'varchar',
    length: 255,
    nullable: false
  })
  writer: string;

  @Column({
    name: 'movie_language',
    type: 'json',
    nullable: false
  })
  ratings: Array<Rating>;

  @Column({
    type: 'int',
    nullable: false
  })
  views: number;

  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: false
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    nullable: true
  })
  updatedAt: Date;

  constructor(review: Partial<IReview>) {
    Object.assign(this, review);
  }
}