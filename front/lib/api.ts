import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    config.headers['client'] = localStorage.getItem('client') || '';
    config.headers['uuid'] = localStorage.getItem('uuid') || '';
    config.headers['access-token'] = localStorage.getItem('access-token') || '';
  }
  return config;
});

export default api;