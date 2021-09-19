const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../credentials/credentials.json');

const doc = new GoogleSpreadsheet('10M4XLCSP4a0Vx4Ic02DWdX32s8vwJX1ei2C1iP3JDxA');

const connectionTest = async () => {

    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();
    console.log(doc);

    const sheet = doc.sheetsByIndex[0];
    //console.log(sheet.title);

    await sheet.loadCells('A1:B100');

    const isoCodeHeaderCell = sheet.getCell(0,0);
    //console.log(isoCodeHeaderCell.value);    
};

connectionTest();

