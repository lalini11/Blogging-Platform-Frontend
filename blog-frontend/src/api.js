import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((request) => {
    const token = localStorage.getItem('token');
    if(token) request.headers.Authorization = token;
    return request;
});

export default API;