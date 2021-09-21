const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../credentials/credentials.json');

const sheetConnection = new GoogleSpreadsheet('10M4XLCSP4a0Vx4Ic02DWdX32s8vwJX1ei2C1iP3JDxA');

(async () => {
    await sheetConnection.useServiceAccountAuth(credentials);
    await sheetConnection.loadInfo();
})();

module.exports = sheetConnection;
