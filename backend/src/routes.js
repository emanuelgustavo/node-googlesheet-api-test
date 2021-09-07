const express = require('express');

const routes = express.Router();

//index
routes.get('/', (req, res) => {
  res.send('Hello World, testando server');
});

module.exports = routes;