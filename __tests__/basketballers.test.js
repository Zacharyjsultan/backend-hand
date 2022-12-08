const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');

describe('bball routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST bballerssss route', async () => {
    const baller = {
      name: 'Earl The Pearl Monroe',
      rating: 6,
      strength: 'grandmother shot technique',
    };
    const res = await request(app).post('/basketballers').send(baller);
    expect(res.body.name).toEqual(baller.name);
    expect(res.body.rating).toEqual(baller.rating);
    expect(res.body.strength).toEqual(baller.strength);
  });

  afterAll(() => {
    pool.end();
  });
});
