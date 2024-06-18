import authApi from "./auth_api";
import { useRouter } from 'next/router';
import axios from "axios";

interface AuthResponse {
  data: {
    id: number;
    email: string;
    provider: string;
    uid: string;
    allow_password_change: boolean;
    name: string;
    nickname: string;
  };
}

export const signUp = async (name:string, email:string, password: string, passwordConfirmation: string): Promise<AuthResponse> => {
  console.log('SignUp request:', { name, email, password, passwordConfirmation });
  const response = await authApi.post('/auth', {
    registration: {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
  });
  console.log('SignUp response:', response.data);
  return response;
};

export const signIn = async (email: string, password: string): Promise<any> => {
  const response = await authApi.post('/auth/sign_in', {
    email,
    password,
  },
  {
    headers: {
      'Contect-Type': 'application/json',
    }
  });
  return response;
};

export const logout = async () => {
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');
  const accessToken = localStorage.getItem('access-token');

  console.log(uid)

  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_TEST_API_URL}/auth/sign_out`, {
      headers: {
        'client': client,
        'uid': uid,
        'access-token': accessToken
      }
    });
    // ログアウト成功時の処
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
    localStorage.removeItem('access-token');
  
    console.log('トークン削除後のlocalStorage:', {
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
      accessToken: localStorage.getItem('access-token')
    });
  
    // 少し遅延を入れてからリダイレクト
    setTimeout(() => {
      const router = useRouter();
      router.push('/');
    }, 100); // 100msの遅延
  
    return response;
  } catch (error) {
    console.error('ログアウトに失敗しました:', error);
  }
};