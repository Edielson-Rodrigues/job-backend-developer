import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableReview1728261706405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(/* sql */ `
      CREATE TABLE review (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_title TEXT NOT NULL,
        notes TEXT NOT NULL,
        movie_release_date TEXT DEFAULT NULL,
        movie_imdb_rating REAL DEFAULT NULL,
        movie_genre TEXT NOT NULL,
        movie_duration TEXT NOT NULL,
        movie_director TEXT NOT NULL,
        movie_actors TEXT NOT NULL,
        movie_writer TEXT NOT NULL,
        movie_language TEXT NOT NULL,
        views INTEGER NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME DEFAULT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(/* sql */ `
      DROP TABLE review;
    `);
  }
}
