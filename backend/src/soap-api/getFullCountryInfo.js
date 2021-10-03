const soap = require('easy-soap-request');

const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?wsdl';
const headers = {
  'Content-Type': 'text/xml; charset=utf-8',
  'Content-Length': 'length'
};

module.exports = {
    async getFullCountryInfo(ISOCode) {

        const xml = `<?xml version="1.0" encoding="utf-8"?>
             <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                <FullCountryInfo xmlns="http://www.oorsprong.org/websamples.countryinfo">
                    <sCountryISOCode>${ ISOCode }</sCountryISOCode>
                </FullCountryInfo>
              </soap:Body>
            </soap:Envelope>`;

        try {

            const { response } = await soap({
                url, 
                headers, 
                xml
            });

            const { header, body, status } = response;

            return body;

        } catch(error) {
            console.error(error);
        }
    }
};