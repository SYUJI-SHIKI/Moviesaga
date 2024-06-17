import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TEST_API_URL}/auth/session`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { uid, client, 'access-token': accessToken } = response.headers;
      router.push(`/auth/callback?uid=${uid}&client=${client}&access-token=${accessToken}`);
    } catch (error) {
      console.error('ログインませんでした', error);
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