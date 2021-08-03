const { Router } = require('express');
const Pizza = require('../models/Pizza');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const pizza = await Pizza.insert(req.body);

      res.send(pizza);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const pizza = await Pizza.getById(id);

      res.send(pizza);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const pizzas = await Pizza.getAll();

      res.send(pizzas);
    } catch(err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { topping, crust, pieSize } = req.body;

      const updatedPizza = await Pizza.updateById(id, { topping, crust, pieSize });

      res.send(updatedPizza);
    } catch(err) {
      next(err);
    }
  });

