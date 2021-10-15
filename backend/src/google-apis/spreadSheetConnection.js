const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../credentials/credentials.json');
const sheetId = require('../credentials/sheetsId.js');

const sheetConnection = new GoogleSpreadsheet(sheetId);

(async () => {
    await sheetConnection.useServiceAccountAuth(credentials);
    await sheetConnection.loadInfo();
})();

module.exports = sheetConnection;
