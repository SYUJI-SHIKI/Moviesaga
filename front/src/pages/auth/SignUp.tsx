import React, { useState } from "react";
import signUp from "./auth";

const SignUp = () => {
  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(name, email, password, passwordConfirmation);
      alert('Sign up successful');
    } catch (error) {
      alert('Sign up failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>email:</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>password:</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Confirmation password:</label>
          <input type='password' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;