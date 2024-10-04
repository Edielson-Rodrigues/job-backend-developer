import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IReview } from "./review.interface";

@Entity({ name: 'review' })
export class ReviewEntity implements IReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
    nullable: false,
    unique: true
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false
  })
  notes: string;
  
  @Column({
    name: 'movie_release',
    nullable: false
  })
  movieRelease: Date;

  @Column({
    name: 'imdb_rating',
    nullable: false
  })
  imdbRating: number;

  @Column({
    name: "movie_genre",
    length: 255,
    nullable: false
  })
  movieGenre: string;

  @Column({
    name: 'duration',
    nullable: false
  })
  movieDuration: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  director: string;

  @Column({
    length: 255,
    nullable: false
  })
  actors: string;

  @Column({
    type: 'int',
    nullable: false
  })
  views: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true
  })
  updatedAt: Date;

  constructor(review: Omit<IReview, "id" | "view" | "updatedAt" | "createdAt">) {
    Object.assign(this, review);
  }
}