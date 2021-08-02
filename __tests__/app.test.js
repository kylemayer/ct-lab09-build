const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('lab8 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a pizza via POST', async () => {
    const pizza = {
      topping: 'cheese',
      crust: 'stuffed',
      pie_size: 'large'
    };

    const res = await (await request(app).post('/api/v1/pizzas')).send(pizza);

    expect(res.body).toEqual({
      id: '1',
      ...pizza
    });
  });

});
