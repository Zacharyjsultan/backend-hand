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

  it('GET all ballers', async () => {
    const res = await request(app).get('/basketballers');
    expect(res.body.length).toEqual(5);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      rating: expect.any(Number),
      strength: expect.any(String),
    });
  });

  it('GET baller by :ID', async () => {
    const res = await request(app).get('/basketballers/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      rating: expect.any(Number),
      strength: expect.any(String),
    });
  });

  it('PUT update ballers', async () => {
    const res = await request(app).put('/basketballers/1').send({
      name: 'Crawford',
      rating: 7,
      strength: 'sauce',
    });
    expect(res.body.name).toEqual('Crawford');
    expect(res.body.rating).toEqual(7);
    expect(res.body.strength).toEqual('sauce');
  });

  it('DELETE baller', async () => {
    const res = await request(app).delete('/basketballers/1');
    expect(res.status).toEqual(204);
  });

  afterAll(() => {
    pool.end();
  });
});
