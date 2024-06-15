import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_TEST_API_URL}/api/v1/auth/register`, {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      router.push('/index');
    } catch (error) {
      console.error('登録できませんでした', error);
    }
  };

  return (
    <div>
      <h1>新規登録</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input
            type='name'
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default RegisterPage;