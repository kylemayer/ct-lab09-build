const express = require('express');
const app = express();
const { route } = require('./controllers/pizzas');

app.use(express.json());

app.use('/api/v1/pizzas', route);


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
