const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Cat } = require('../lib/models/Cats');

describe('cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('post cat', async () => {
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
  it('get all cats', async () => {
    const res = await request(app).get('/cats');
    expect(res.body.length).toEqual(6);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      breed: expect.any(String),
      age: expect.any(Number),
    });
  });

  it('get cats by id', async () => {
    const res = await request(app).get('/cats/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      breed: expect.any(String),
      age: expect.any(Number),
    });
  });
  it('update cats', async () => {
    const res = await request(app).put('/cats/1').send({
      name: 'Giupetto',
      breed: 'Tabby',
      age: 22,
    });
    expect(res.body.name).toEqual('Giupetto');
    expect(res.body.breed).toEqual('Tabby');
    expect(res.body.age).toEqual(22);
  });

  afterAll(() => {
    pool.end();
  });
});
