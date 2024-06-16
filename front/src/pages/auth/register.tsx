import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TEST_API_URL}/api/v1/auth`,
        {
          email,
          password,
          name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        router.push('/login'); // 登録成功後にログインページへリダイレクト
      }
    } catch (error) {
      console.error('登録に失敗しました', error);
    }
  };

  return (
    <div>
      <h1>新規登録</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </div>
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
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <div>
          <label>confirmation password:</label>
          <input
            type='password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            />
        </div>
        <button type="button" onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  )
}

export default RegisterPage;