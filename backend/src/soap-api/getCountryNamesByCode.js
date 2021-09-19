const soap = require('easy-soap-request');
const util = require('util');
const { parseString } = require('xml2js');

const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?wsdl';
const header = {
  'Content-Type': 'text/xml; charset=utf-8',
  'Content-Length': 'length'
}
const xml = `<?xml version="1.0" encoding="utf-8"?>
             <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                <ListOfCountryNamesByCode xmlns="http://www.oorsprong.org/websamples.countryinfo">
                </ListOfCountryNamesByCode>
              </soap:Body>
            </soap:Envelope>`

module.exports = {

  async getListOfCountryNamesByCode() {
    const { response } = await soap({
      url: url,
      headers: header,
      xml: xml
    });
    
    const { body } = response;

    //console.log(body);    

    //const objectBody = util.inspect(body, false, Infinity);

    /* const listOfCountry = parseString(body, (err, result) => {
      
      if(err) return

      const parsedResult = util.format(result, '%O');
      return parsedResult;

    }); */

    const arrayBody = body.split('\n');

    return arrayBody;

    arrayBody.map( (line, index) => {
      const lineTrimmed = line.trim();

      let isoCode = ''
      let countryName = ''

      if(lineTrimmed.includes('<m:sISOCode>')){
        isoCode = lineTrimmed.substr(lineTrimmed.indexOf('>') + 1, 2);

        countryName = arrayBody[index+1].substr(arrayBody[index+1].indexOf('>')+1, arrayBody[index+1].lastIndexOf('<') - arrayBody[index+1].indexOf('>')-1);
      
        console.log(`${index} : ${isoCode} - ${countryName}`);
      };

    });

    //console.log(typeof(body));
    //console.log(objectBody);
    //console.log(arrayBody);
    //console.log(response);
    //console.log(listOfCountry['tagName']);
    //console.log(Object.keys(listOfCountry));
  }

};

