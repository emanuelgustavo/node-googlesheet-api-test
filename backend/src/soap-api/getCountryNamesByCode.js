const soap = require('soap');
const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
const args = {};

soap.createClientAsync(url)
  .then((client) => {
    client.ListOfCountryNamesByCodeAsync(args);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = getCountryNamesByCode;