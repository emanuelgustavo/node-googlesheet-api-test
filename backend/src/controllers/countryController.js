//Responsible to get information from soap api and set in the google sheets db
const { getSystemErrorMap } = require('util');
const sheetConnection = require('../google-apis/spreadSheetConnection.js');

module.exports = {

    async getAllCountries(request, response, next) {

        try{

            const sheet = await sheetConnection.sheetsByIndex[0];

            const rows = await sheet.getRows();

            await sheet.loadCells('A1:B100');

            response.end('Get countries success!');

            next();
        
        }catch(error) {
            console.log(error);
            response.end(`Error: ${error}`);
        };
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

    async insertListOfCountries(request, response) {

        try{

            const { sheetId } = request.params;

            const sheet = await sheetConnection.sheetsByIndex[sheetId];

            await sheet.addRows([
                { ISOCode: 'TESTE', countryName: 'teste' },
                { ISOCode: 'TESTE2', countryName: 'teste2'}            
            ]);

            response.end('Success!');

        }catch (error) {
            console.log(error);
            response.end(error);
        } 

    }
};


