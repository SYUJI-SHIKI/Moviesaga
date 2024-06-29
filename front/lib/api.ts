import axios from "axios";

let client = "";
let uuid = "";
let accessToken = "";

if (typeof window !== "undefined") {
  // クライアントサイドでのみ実行される
  client = localStorage.getItem('client') || "";
  uuid = localStorage.getItem('uuid') || "";
  accessToken = localStorage.getItem('access-token') || "";
}

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {
    'client': client,
    'uuid': uuid,
    'access-token': accessToken,
    'Content-Type': 'application/json',
  },
});

export default api;

