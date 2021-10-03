//Responsible to get information from soap api and set in the google sheet
const { json } = require('express');
const xml2js = require('xml2js');
const util = require('util');

const sheetConnection = require('../google-apis/spreadSheetConnection.js');

const { getListOfCountryNamesByCode } = require('../soap-api/getCountryNamesByCode.js');
const { getFullCountryInfo } = require('../soap-api/getFullCountryInfo.js');

module.exports = {

    async getAllCountries(request, response) {

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

    async getACountryByIsoCode(request, response) {

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

    async insertListOfCountries(request, response) {

        const listOfCountries = await getListOfCountryNamesByCode();

        console.log(listOfCountries);

        try{

            const { sheetId } = request.params;
            //const { data } = request.body;

            const sheet = await sheetConnection.sheetsByIndex[sheetId];

            await sheet.addRows(listOfCountries);

            response.end('Success!');

        }catch (error) {
            console.log(`Erro ao tentar inserir lista de países na tabela: ${error}`);
            response.end(error);
        }
    },

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
    
    async getFullCountryInfo(request, response) {

        const { ISOCode } = request.params;
        
        try{
            
            const fullCountryInfo = await getFullCountryInfo(ISOCode);
            
            const parser = new xml2js.Parser();
            const parsedFullCountryInfo =  parser.parseString(fullCountryInfo, (error, result) => {
                    if (error) return error;
                    return result;
                });
            
            //console.log(parsedFullCountryInfo['soap:Envelope']);

            console.dir(util.inspect(parsedFullCountryInfo, false, null));
                    
        } catch(error) {
            console.error(error);
        };

    }
};


