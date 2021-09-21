//Responsible to get information from soap api and set in the google sheets db
const sheetConnection = require('../google-apis/spreadSheetConnection.js');

module.exports = {

    async getAllCountries() {

        const sheet = sheetConnection.sheetsByIndex[0];

        const rows = await sheet.getRows();

        console.log(rows);
    }
};


