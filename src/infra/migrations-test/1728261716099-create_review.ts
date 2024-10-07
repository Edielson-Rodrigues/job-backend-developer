import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReview1728261716099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(/* sql */ `
      INSERT INTO review
      (
        id,
        movie_title,
        notes,
        movie_release_date,
        movie_imdb_rating,
        movie_genre,
        movie_duration,
        movie_director,
        movie_actors,
        movie_writer,
        movie_language,
        views,
        created_at,
        updated_at)
    VALUES(
      3,
      'Inception',
      'A mind-bending thriller',
      '2010-07-16 00:00:00',
      8.8,
      'Action, Adventure, Sci-Fi',
      '148 min',
      'Christopher Nolan',
      'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy',
      'Christopher Nolan',
      '[{"value": "8.8/10", "source": "Internet Movie Database"}, {"value": "87%", "source": "Rotten Tomatoes"}, {"value": "74/100", "source": "Metacritic"}]',
      0,
      '2024-10-07 10:00:00',
      '2024-10-07 10:05:00'
    );
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(/* sql */ `
      DELETE FROM review
      WHERE
        id = 3;
    `);
  }
}

