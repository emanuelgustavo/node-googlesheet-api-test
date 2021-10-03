const express = require('express');

const countryController = require('./controllers/countryController.js');

const routes = express.Router();

//get all countries from google sheets database
routes.get('/', (request, response) => {
        response.send('Server started');
      }
    );

//Insert countrie in google sheets database
routes.get('/insertACountry/:sheetId', countryController.insertACountry);

//Insert countrie in google sheets database
routes.get('/insertListOfCountries/:sheetId', countryController.insertListOfCountries);

//Get the countries list from gs
routes.get('/listOfCountriesByName', countryController.getAllCountries);

//Get a country by ISOCode from gs
routes.get('/countryByISOCode/:ISOCode', countryController.getACountryByIsoCode);

//Get a full country info
routes.get('/getFullCountryInfo/:ISOCode', countryController.getFullCountryInfo);

module.exports = routes;