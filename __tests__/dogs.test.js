const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Dogs } = require('../lib/models/Dogs');

describe('dogs routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST', async () => {
    const dog = new Dogs({
      name: 'mango',
      breed: 'toddler',
    });
    const res = await request(app).post('/dogs').send(dog);
    expect(res.body.name).toEqual(dog.name);
    expect(res.body.breed).toEqual(dog.breed);
    const count = await Dogs.dogCount();
    expect(count).toEqual(6);
    expect(res.status).toBe(200);
  });

  it('get all dogs route', async () => {
    const res = await request(app).get('/dogs');
    expect(res.body.length).toEqual(5);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      breed: expect.any(String),
    });
  });

  it('Get/:id dogs by id ', async () => {
    const res = await request(app).get('/dogs/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      breed: expect.any(String),
    });
  });

  it('/put/ dogs route', async () => {
    const dog = {
      name: 'jupiter',
      breed: 'corgi',
    };
    const res = await request(app).put('/dogs/update').send(dog);
    expect(res.body).toEqual(dog);
  });

  afterAll(() => {
    pool.end();
  });
});
