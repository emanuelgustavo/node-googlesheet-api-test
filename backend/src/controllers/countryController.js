//Responsible to get information from soap api and set in the google sheet
const soap = require('soap');

const sheetConnection = require('../google-apis/spreadSheetConnection.js');

const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?wsdl';

module.exports = {

    //get all countries from google sheet database
    async getAllCountriesFromGS(request, response) {

        try{

            const sheet = sheetConnection.sheetsByIndex[0];

            const rows = await sheet.getRows();

            await sheet.loadCells(`A1:B${rows.length-1}`);

            rows.map(cellData => {
                console.log(`Iso Code: ${cellData._rawData[0]} | Country Name: ${cellData._rawData[1]}`);
            });

            response.end('Get countries success!');
        
        }catch(error) {
            console.log(error);
            response.end(`Error: ${error}`);
        };
    },

    //get a country from google sheet database
    async getACountryByIsoCodeFromGS(request, response) {

        const { ISOCode } = request.params;

        try{

            const sheet = sheetConnection.sheetsByIndex[0];

            const rows = await sheet.getRows();

            const foundCountry = rows.find( (ISOCode, index) => {
                console.log(rows[index]._rawData[0]);
                //rows[index]._rawData[0] === ISOCode
            });

            console.log(foundCountry);

            response.end('Get countries success!');
        
        }catch(error) {
            console.log(error);
            response.end(`Error: ${error}`);
        };

    },

    //insert a countries list into google sheet database from countries info api
    async insertListOfCountries(request, response) {
        
        const { sheetId } = request.params;
            
        const sheet = await sheetConnection.sheetsByIndex[sheetId];

        const args = {};

        soap.createClientAsync(url)
            .then((client) => {
                return client.ListOfCountryNamesByCodeAsync(args);
            })
            .then((result) => {

                let resultList = [];
                const list = result[0].ListOfCountryNamesByCodeResult.tCountryCodeAndName;
                list.map( country => {
                resultList.push(country);
                });
                
                console.log('countryController');
                //console.log(listOfCountries);
            
                sheet.addRows(resultList);
                response.end('Success!');
            
            })
            .catch(error => {
                console.error(`Erro: ${error}`);
            });       
    },

    //insert a country into goole sheet database
    async insertACountry(request, response) {
        
        try{

            const { sheetId } = request.params;

            const sheet = await sheetConnection.sheetsByIndex[sheetId];

            await sheet.addRow({
                ISOCode: 'TESTE',
                countryName: 'teste'
            });

            response.end('Success!');

        }catch (error) {
            console.log(error);
            response.end(error);
        }    
    },
    
    //get a country full info from api
    async getFullCountryInfo(request, response) {

        const { ISOCode } = request.params;
        
        try{
            
            
                    
        } catch(error) {
            console.error(error);
        };

    }
};


