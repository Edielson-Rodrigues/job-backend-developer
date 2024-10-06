import { faker } from '@faker-js/faker';
import { ReviewEntity } from '../../../src/reviews/entity/review.entity';

const genres = [
  'Action', 
  'Adventure', 
  'Comedy', 
  'Crime', 
  'Drama', 
  'Fantasy', 
  'Historical', 
  'Horror', 
  'Mystery', 
  'Philosophical', 
  'Political', 
  'Romance', 
  'Saga', 
  'Satire', 
  'Science fiction', 
  'Social', 
  'Speculative', 
  'Thriller', 
  'Urban', 
  'Western'
];

export function generateReviewEntity(): ReviewEntity {
  return new ReviewEntity({
    id: faker.number.int(),
    actors: faker.person.firstName(),
    director: faker.person.firstName(),
    duration: `${faker.number.int()} min`,
    genre: faker.helpers.arrayElement(genres),
    imdbRating: faker.number.float({ min: 0, max: 10 }),
    notes: faker.lorem.sentence(),
    ratings: [{
      source: faker.internet.domainName(),
      value: `${faker.number.float({ min: 0, max: 100})} / 100`
    }],
    releaseDate: faker.date.recent(),
    title: faker.lorem.word(),
    views: faker.number.int(),
    writer: faker.person.firstName(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  });
}