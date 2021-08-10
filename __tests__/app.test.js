const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Pizza = require('../lib/models/Pizza.js');

describe('lab8 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a pizza via POST', async () => {
    const pizza = {
      topping: 'cheese',
      crust: 'stuffed',
      pieSize: 'large'
    };

    const res = await request(app).post('/api/v1/pizzas').send(pizza);
    console.log(res.body);
    expect(res.body).toEqual({
      id: '1',
      ...pizza
    });
  });

  it('gets a single pizza by id via GET', async () => {
    const pizza = await Pizza.insert({
      topping: 'cheese',
      crust: 'stuffed',
      pieSize: 'large'
    });

    const res = await request(app)
      .get(`/api/v1/pizzas/${pizza.id}`);

    expect(res.body).toEqual(pizza);
  });

  it('gets all pizzas via GET', async () => {
    const cheesePizza = await Pizza.insert({
      topping: 'cheese',
      crust: 'stuffed',
      pieSize: 'large'
    });
    const peppPizza = await Pizza.insert({
      topping: 'pepperoni',
      crust: 'thick',
      pieSize: 'small'
    });
    const sausagePizza = await Pizza.insert({
      topping: 'sausage',
      crust: 'thin',
      pieSize: 'medium'
    });

    const res = await request(app)
      .get('/api/v1/pizzas/');

    expect(res.body).toEqual([cheesePizza, peppPizza, sausagePizza]);
  });

  it('updates a pizza by id via PUT', async () => {
    const pizza = await Pizza.insert({
      topping: 'cheese',
      crust: 'stuffed',
      pieSize: 'large'
    });

    const res = await request(app)
      .put(`/api/v1/pizzas/${pizza.id}`)
      .send({ pieSize: 'extra-large' });

    expect(res.body).toEqual({ ...pizza, pieSize: 'extra-large' });
  });

  it('deletes a pizza by id via DELETE', async () => {
    const pizza = await Pizza.insert({
      topping: 'cheese',
      crust: 'stuffed',
      pieSize: 'large'
    });

    const res = await request(app)
      .delete(`/api/v1/pizzas/${pizza.id}`);

    expect(res.body).toEqual({ message: `${pizza.id} has been deleted` });
  });

});
