//Responsible to get information from soap api and set in the google sheets db
const soapApiConnection = require('../soap-api/getCountryNamesByCode.js');
const sheetConnection = require('../google-apis/spreadSheetConnection.js');

module.exports = {

    async getAllCountries(request, response, next) {

        try{

            const sheet = await sheetConnection.sheetsByIndex[0];

            await sheet.loadCells('A1:B100');

            response.end('Get countries success!');
        
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
            const { data } = request.body;

            const sheet = await sheetConnection.sheetsByIndex[sheetId];

            await sheet.addRows(data);

            response.end('Success!');

        }catch (error) {
            console.log(`Erro ao tentar inserir lista de países na tabela: ${error}`);
            response.end(error);
        }
    }
};


