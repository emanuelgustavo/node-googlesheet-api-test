const express = require('express');

const soapApi = require('./soap-api/getCountryNamesByCode.js');

const countryController = require('./controllers/countryController.js');

const routes = express.Router();

//get all countries from google sheets database
routes.route('/')
    .get(
        countryController.getAllCountries,
        countryController.insertListOfCountries
    );

//test to insert countrie in google sheets database
routes.get('/insertACountry/:sheetId', countryController.insertACountry);

//test to insert countrie in google sheets database
routes.get('/insertListOfCountries/:sheetId', countryController.insertListOfCountries);

//test soap api connection
routes.get('test', soapApi.getListOfCountryNamesByCode);


//express example for routes handler
/*
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  var cb1 = function (req, res, next) {
    console.log('CB1')
    netx()
  }
  
  routes.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
  }, function (req, res) {
    res.send('Hello from D!')
  })
*/


module.exports = routes;