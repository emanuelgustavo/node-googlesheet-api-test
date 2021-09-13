import React from 'react';
import axios from 'axios';

//import soapApi from '../services/soap-api';

export default function ApiTest(){

    const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso';
    const opListOfCountryNamesByCode = 'ListOfCountryNamesByCode';

    const config = {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'Content-Length': 'length'
        }
    };
    let resultOfApi = '';

    const xlms = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ListOfCountryNamesByCode xmlns="http://www.oorsprong.org/websamples.countryinfo">
        </ListOfCountryNamesByCode>
      </soap:Body>
    </soap:Envelope>`;

    axios.post(`${url}/${opListOfCountryNamesByCode}`, xlms, config)
        .then( response => {
            console.log(response);
            resultOfApi = response;
        })
        .catch( error => {
            console.log(error);
        });
    
    return(
        <div>
            {resultOfApi}
        </div>
    )
};