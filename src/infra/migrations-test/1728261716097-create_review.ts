import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReview1728261716097 implements MigrationInterface {
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
      1,
      'The Shawshank Redemption',
      'This movie is amazing',
      '1994-01-01 00:00:00',
      9.3,
      'Drama',
      '142 min',
      'Frank Darabont',
      'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
      'Stephen King, Frank Darabont',
      '[{"value": "9.3/10", "source": "Internet Movie Database"}, {"value": "91%", "source": "Rotten Tomatoes"}, {"value": "80/100", "source": "Metacritic"}]',
      1,
      '2024-10-06 18:50:59',
      '2024-10-06 18:52:10'
    );
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(/* sql */ `
      DELETE FROM review
      WHERE
        id = 1;
    `);
  }
}
