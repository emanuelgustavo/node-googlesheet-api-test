const express = require('express');

const soapApi = require('./soap-api/getCountryNamesByCode.js');

const countryController = require('./controllers/countryController.js');

const routes = express.Router();

//test google sheets connection
routes.get('/', countryController.getAllCountries)

//test soap api connection
routes.get('test', soapApi.getListOfCountryNamesByCode);

module.exports = routes;