import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_TEST_API_URL}/api/v1/`,
});

authApi.interceptors.request.use(config => {
  const token = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');
  if (token && client && uid) {
    config.headers['access-token'] = token;
    config.headers['client'] = client;
    config.headers['uid'] = uid;
  }
  return config;
});

authApi.interceptors.response.use(response => {
  const token = response.headers['access-token'];
  const client = response.headers['client'];
  const uid = response.headers['uid'];
  if (token && client && uid) {
    localStorage.setItem('access-token', token);
    localStorage.setItem('client', client);
    localStorage.setItem('uid', uid);
  }
  return response;
});

export default authApi;