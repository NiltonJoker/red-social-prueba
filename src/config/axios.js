import axios  from 'axios';
import { BASE_URL_API, API_KEY } from '../constants/API';

const clienteAxios = axios.create({
  baseURL: BASE_URL_API,
  headers: {'app-id': API_KEY}
});

export default clienteAxios;