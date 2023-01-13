import axios from 'axios';
import { API_URL, CLIENT_ID } from './constants/Env';

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Client-ID ${CLIENT_ID}`
    }
});

export default API;
