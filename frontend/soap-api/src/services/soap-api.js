import axios from 'axios';

const soapApi = axios.create({
    baseURL: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?wsdl'
});

export default soapApi;