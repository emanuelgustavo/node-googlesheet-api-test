const soap = require('easy-soap-request');

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

    try{

      const { response } = await soap({
        url: url,
        headers: header,
        xml: xml
      });
      
      const { body } = response;

      const arrayBody = body.split('\n');

      const listOfCountries = [];

      //return arrayBody;

      arrayBody.map( (line, index) => {
        const lineTrimmed = line.trim();

        let isoCode = ''
        let countryName = ''

        if(lineTrimmed.includes('<m:sISOCode>')){
          
          let countryInfo = '';
          
          isoCode = lineTrimmed.substr(lineTrimmed.indexOf('>') + 1, 2);

          countryName = arrayBody[index+1].substr(arrayBody[index+1].indexOf('>')+1, arrayBody[index+1].lastIndexOf('<') - arrayBody[index+1].indexOf('>')-1);
        
          countryInfo = `{"ISOCode": ${isoCode}, "countryName": ${countryName}}`;

          listOfCountries = [...listOfCountries, countryInfo] 
        };

        console.log('Success');

        console.log(listOfCountries);

      });
    } catch(error){
      console.log(error);
    }
  }
};

