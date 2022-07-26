import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

const token = Cookies.get('cis.token');

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export { api };
