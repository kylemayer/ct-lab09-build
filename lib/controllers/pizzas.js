const { Router } = require('express');
const Pizza = require('../models/Pizza');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const pizza = await Pizza.insert(req.body);
      console.log(req.body);
      res.send(pizza);
    } catch(err) {
      next(err);
    }
  });

