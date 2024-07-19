import axios from 'axios';

const apiUrl = '/api';

export const axiosPublic = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
