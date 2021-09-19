const express = require('express');

const soapApi = require('./soap-api/getCountryNamesByCode.js');

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

//helloWorld
routes.get('test', soapApi.getListOfCountryNamesByCode);

module.exports = routes;