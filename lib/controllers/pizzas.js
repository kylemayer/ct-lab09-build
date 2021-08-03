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
  });

