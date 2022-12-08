const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Cat } = require('../lib/models/Cats');

describe('cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('post cat', async () => {
    const cat = {
      name: 'alcapulco',
      breed: 'hairless',
      age: 1,
    };
    const res = await request(app).post('/cats').send(cat);
    expect(res.body.name).toEqual(cat.name);
    expect(res.body.breed).toEqual(cat.breed);
    expect(res.body.age).toEqual(cat.age);
    const count = await Cat.count();
    expect(count).toEqual(7);
    expect(res.status).toEqual(200);
  });
});
afterAll(() => {
  pool.end();
});
