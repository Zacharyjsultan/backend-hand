const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');

describe('cities routes', () => {
  beforeEach(() => {
    return setup(pool);
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
  afterAll(() => {
    pool.end();
  });
});
