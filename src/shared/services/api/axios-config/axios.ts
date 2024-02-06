import axios from 'axios';
import { errorInterceptor, responseResponse } from './interceptos';
import { Enviroement } from '../../../environment/index';

const Api = axios.create({
  baseURL: Enviroement.URL_BASE || 'http://localhost:3333',
});

Api.interceptors.response.use(
  (response) => responseResponse(response),
  (error) => errorInterceptor(error),
);

export { Api };
