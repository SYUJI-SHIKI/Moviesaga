import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_TEST_API_URL}/api/v1`,
});

authApi.interceptors.request.use(config => {
  if (typeof window !== 'undefined') { // クライアントサイドでのみ実行
    const token = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');
    if (token && client && uid) {
      config.headers['access-token'] = token;
      config.headers['client'] = client;
      config.headers['uid'] = uid;
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
    const uid = data['uid'];
    if (token && client && uid) {
      localStorage.setItem('access-token', token);
      localStorage.setItem('client', client);
      localStorage.setItem('uid', uid);
    }

    console.log('Access Token:', token);
    console.log('Client:', client);
    console.log('UID:', uid);
  }
  return response;
}, error => {
  return Promise.reject(error);
});

export default authApi;