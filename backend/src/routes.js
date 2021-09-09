const express = require('express');

const routes = express.Router();

//index
routes.get('/', (req, res) => {
  res.send(
    '<a href="/helloworld">Hello World</a>'
  );
});

//helloWorld
routes.get('/helloworld', (req, res) => {
  res.send(
    'Hello World'
  );
});

module.exports = routes;