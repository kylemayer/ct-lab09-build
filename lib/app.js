const express = require('express');
const app = express();
const pizzasController = require('./controllers/pizzas');

app.use(express.json());

app.use('/api/v1/pizzas', pizzasController);


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = {
  app,
};
