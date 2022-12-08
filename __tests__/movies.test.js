const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const { Movies } = require('../lib/models/Movies');

describe('rout 4 movies', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST movie', async () => {
    const movie = new Movies({
      title: 'Earth',
      year: 2510,
      rating: 2,
    });
    const res = await request(app).post('/movies').send(movie);
    expect(res.body.title).toEqual(movie.title);
    expect(res.body.year).toEqual(movie.year);
    expect(res.body.rating).toEqual(movie.rating);
    const count = await Movies.count();
    expect(count).toEqual(7);
  });
  it('GET all moobies ', async () => {
    const res = await request(app).get('/movies');
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      year: expect.any(Number),
      rating: expect.any(Number),
    });
    const count = await Movies.count();
    expect(count).toEqual(6);
  });
  afterAll(() => {
    pool.end();
  });
});
