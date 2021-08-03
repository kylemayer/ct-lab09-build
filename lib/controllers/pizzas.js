const { Router } = require('express');
const Pizza = require('../models/Pizza').default;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const pizza = await Pizza.insert(req.body);

      res.send(pizza);
    } catch(err) {
      next(err);
    }
  });

