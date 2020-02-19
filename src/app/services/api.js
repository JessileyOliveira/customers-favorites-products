import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
  baseURL: process.env.API_PRODUCTS || 'http://challenge-api.luizalabs.com',
});

export default api;
