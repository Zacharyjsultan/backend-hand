const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');

describe('cities routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/put route for cities', async () => {
    const res = await request(app).put('/api/v1/cities/1').send({
      name: 'Detroit',
    });
    expect(res.body.name).toEqual('Detroit');
  });

  it('/post cities skt', async () => {
    const city = {
      name: 'seattle',
      skateparks: 14,
      state: 'washington',
    };
    const res = await request(app).post('/api/v1/cities').send(city);
    expect(res.body.name).toEqual(city.name);
    expect(res.body.skateparks).toEqual(city.skateparks);
    expect(res.body.state).toEqual(city.state);
  });

  it('/get cities route', async () => {
    const res = await request(app).get('/api/v1/cities');
    expect(res.body.length).toEqual(6);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      skateparks: expect.any(Number),
      state: expect.any(String),
    });
  });

  it('/GET cities by id', async () => {
    const res = await request(app).get('/api/v1/cities/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      skateparks: expect.any(Number),
      state: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
