const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../credentials/credentials.json');
const { sheetIdentification } = require('../credentials/sheetsId.js');

const sheetConnection = new GoogleSpreadsheet(sheetIdentification);

(async () => {
    await sheetConnection.useServiceAccountAuth(credentials);
    await sheetConnection.loadInfo();
})();

module.exports = sheetConnection;
