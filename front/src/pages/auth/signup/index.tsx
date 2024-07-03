import React, { useState } from "react";
import signUp from "@/features/auth/signUp";
import { useRouter } from "next/router";
import GoogleLoginButton from "../../../features/auth/GoogleButton";
import styles from "../authForm.module.css"
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }
    try {
      await signUp(name, email, password, passwordConfirmation);
      alert("Sign up successful");

      window.dispatchEvent(new Event("storage"));
      router.push('/')
    } catch (error) {
      alert("Sign up failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#dde3e6] via-[#518698] to-[#2c5364] text-white animate-gradient-flow bg-[length:400%_400%]">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg w-[450px] p-8 my-10 mb-20 border border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out">
        <div className="text-2xl text-center mb-6 font-museo-slab">新規登録</div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex rounded-md overflow-hidden">
            <label htmlFor="name" className="bg-[#222222] px-4 py-3 flex items-center">
              <FaRegUser />
            </label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-3 bg-white text-[#3A3F44] focus:bg-gray-100 transition duration-300"
              placeholder="なまえ"
              required
            />
          </div>
          <div className="flex rounded-md overflow-hidden">
            <label htmlFor="email" className="bg-[#222222] px-4 py-3 flex items-center">
              <MdOutlineEmail />
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-white text-[#3A3F44] focus:bg-gray-100 transition duration-300"
              placeholder="メールアドレス"
              required
            />
          </div>
          <div className="flex rounded-md overflow-hidden">
            <label htmlFor="password" className="bg-[#222222] px-4 py-3 flex items-center">
              <RiLockPasswordLine />
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-4 py-3 bg-white text-[#3A3F44] focus:bg-gray-100 transition duration-300"
              placeholder="パスワード(6文字以上)"
              required
            />
          </div>
          <div className="flex rounded-md overflow-hidden">
            <label htmlFor="passwordConfirmation" className="bg-[#222222] px-4 py-3 flex items-center">
              <RiLockPasswordLine />
            </label>          
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="flex-1 px-4 py-3 bg-white text-[#3A3F44] focus:bg-gray-100 transition duration-300"
              placeholder="パスワード(確認用)"
              required
            />
          </div>
          <button
          type="submit"
          className="w-full bg-[#00B9BC] text-white font-bold uppercase py-3 rounded-md hover:bg-[#197071] transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className={`bg-gray-600 z-30 mx-auto my-8 w-10 h-10 uppercase rounded-full ${styles['or-divider']}`}>
            <div className="p-2 font-medium">
              OR
            </div>
        </div>
        <div className="flex justify-center items-center w-full-screen">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
