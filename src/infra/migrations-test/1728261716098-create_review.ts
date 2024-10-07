import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReview1728261716098 implements MigrationInterface {
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
      2,
      'The Matrix',
      'A groundbreaking sci-fi classic',
      '1999-03-31 00:00:00',
      8.7,
      'Sci-Fi',
      '136 min',
      'Lana Wachowski, Lilly Wachowski',
      'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
      'Lana Wachowski, Lilly Wachowski',
      '[{"value": "8.7/10", "source": "Internet Movie Database"}, {"value": "87%", "source": "Rotten Tomatoes"}, {"value": "73/100", "source": "Metacritic"}]',
      0,
      '2024-10-07 09:00:00',
      '2024-10-07 09:05:00'
    );
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(/* sql */ `
      DELETE FROM review
      WHERE
        id = 2;
    `);
  }
}
