const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const { Basketballers } = require('../lib/models/Basketballers');

describe('bball routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST bballerssss route', async () => {
    const baller = new Basketballers({
      name: 'Earl The Pearl Monroe',
      rating: 6,
      strength: 'grandmother shot technique',
    });
    const res = await request(app).post('/basketballers').send(baller);
    expect(res.body.name).toEqual(baller.name);
    expect(res.body.rating).toEqual(baller.rating);
    expect(res.body.strength).toEqual(baller.strength);
    const count = await Basketballers.count();
    expect(count).toEqual(6);
  });

  afterAll(() => {
    pool.end();
  });
});
