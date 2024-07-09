import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

authApi.interceptors.request.use(config => {
  if (typeof window !== 'undefined') { // クライアントサイドでのみ実行
    const token = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uuid = localStorage.getItem('uuid');
    if (token && client && uuid) {
      config.headers['access-token'] = token;
      config.headers['client'] = client;
      config.headers['uuid'] = uuid;
    }
  }
  return config;
});

authApi.interceptors.response.use(response => {
  if (typeof window !== 'undefined') { // クライアントサイドでのみ実行
    const data = response.data.data
    const token = data['access-token'];
    console.log("トーーーーーーくん", data)
    console.log("データの型:", typeof data);
    console.log("データのプロパティ:", Object.keys(data));

    const client = data['client'];
    const uuid = data['uuid'];
    if (token && client && uuid) {
      localStorage.setItem('access-token', token);
      localStorage.setItem('client', client);
      localStorage.setItem('uuid', uuid);
    }

    console.log('保存したトークン:', localStorage.getItem('access-token'));
    console.log('Access Token:', token);
    console.log('Client:', client);
    console.log('UUID:', uuid);
  }
  return response;
}, error => {
  return Promise.reject(error);
});

export default authApi;