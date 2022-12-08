const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const { Movies } = require('../lib/models/Movies');

describe('rout 4 movies', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET moobie id', async () => {
    const res = await request(app).get('/movies/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      year: expect.any(Number),
      rating: expect.any(Number),
    });
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

  it('PUT moobies route', async () => {
    const res = await request(app).put('/movies/1').send({
      title: 'Zagger N Evans',
      year: 2525,
      rating: 1,
    });
    expect(res.body.title).toEqual('Zagger N Evans');
    expect(res.body.year).toEqual(2525);
    expect(res.body.rating).toEqual(1);
  });

  it('DELETE moobi', async () => {
    const res = await request(app).delete('/movies/1');
    expect(res.status).toEqual(204);
  });

  afterAll(() => {
    pool.end();
  });
});
