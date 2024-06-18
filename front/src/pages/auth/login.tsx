import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "./auth";
import { useEffect } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    if (token && token !== '{}') {
      router.push('/'); // 既にログインしている場合はルートページにリダイレクト
    }
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await signIn(email, password);
      console.log('Response:', response);
      console.log('Headers:', response.data);

      // const { uid, client, 'access-token': accessToken } = response.headers;
      console.log('Headers:', response.headers);
      console.log('Access Token:', localStorage.getItem('access-token'));
      console.log('Client:', localStorage.getItem('client'));
      console.log('UID:', localStorage.getItem('uid'));

      router.push('/');
    } catch (error) {
      console.error('ログインできませんでした', error);
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        <div>
          <label>password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;