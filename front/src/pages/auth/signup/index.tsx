import React, { useState } from "react";
import signUp from "@/features/auth/signUp";
import { useRouter } from "next/router";
import GoogleLoginButton from "../../../features/auth/GoogleButton";
import styles from "../authForm.module.css"
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import WeakGrain from "@/components/elements/Grain/WeakGrain";
import { ErrorMessage } from "@/components/elements/Alert/Alert";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") {
      setError("名前が空欄です");
      return;
    }

    if (name.length > 20) {
      setError("名前は20文字以内でお願いします");
      return;
    }

    if (email.trim() === "") {
      setError("メールアドレスが空欄です");
      return;
    }

    if (password.trim() === "") {
      setError("パスワードが空欄です");
      return;
    }

    if (password.length < 6) {
      setError("パスワードは6文字以上でお願いします");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("パスワードが確認用と一致しません");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("パスワードが確認用と一致しません");
      return;
    }

    try {
      await signUp(name, email, password, passwordConfirmation);
      alert("Sign up successful");

      window.dispatchEvent(new Event("storage"));
      router.push('/')
    } catch (error){
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("Sign up failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen max-sm:items-start bg-gradient-to-br from-[#e4e3e3] via-[#c98f8692] to-[#ea4a4a] text-[#f4e1d2] animate-gradient-flow bg-[length:400%_400%]">
      <div className="fixed inset-0 z-20 overflow-x-hidden">
        <WeakGrain />
      </div>
      <div className="bg-[#f4e1d2]/10 backdrop-blur-md rounded-xl shadow-lg w-[450px] p-8 z-30 my-10 mb-20 max-sm:mt-20 border border-[#d2b48c]/20 hover:shadow-2xl transition-all duration-300 ease-in-out">
        <div className="text-2xl text-center mb-6 font-serif text-[#f4e1d2]">新規登録</div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <ErrorMessage message={error} />}
          <div className="flex rounded-md overflow-hidden">
            <label htmlFor="name" className="bg-[#c59f9f] px-4 py-3 flex items-center text-[#f4e1d2]">
              <FaRegUser />
            </label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#f4e1d2] text-[#4a3728] focus:bg-[#e6ccb2] transition duration-300"
              placeholder="名前"
              required
            />
          </div>
          <div className="flex rounded-md overflow-hidden">
            <label htmlFor="email" className="bg-[#c59f9f] px-4 py-3 flex items-center text-[#f4e1d2]">
              <MdOutlineEmail />
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#f4e1d2] text-[#4a3728] focus:bg-[#e6ccb2] transition duration-300"
              placeholder="メールアドレス"
              required
            />
          </div>
          <div className="flex rounded-md overflow-hidden">
            <label htmlFor="password" className="bg-[#c59f9f] px-4 py-3 flex items-center text-[#f4e1d2]">
              <RiLockPasswordLine />
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#f4e1d2] text-[#4a3728] focus:bg-[#e6ccb2] transition duration-300"
              placeholder="パスワード(6文字以上)"
              required
            />
          </div>
          <div className="flex rounded-md overflow-hidden">
            <label htmlFor="passwordConfirmation" className="bg-[#c59f9f] px-4 py-3 flex items-center text-[#f4e1d2]">
              <RiLockPasswordLine />
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#f4e1d2] text-[#4a3728] focus:bg-[#e6ccb2] transition duration-300"
              placeholder="パスワード(確認用)"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#c59f9f] text-[#f4e1d2] font-bold uppercase py-3 rounded-md hover:bg-[#a0522d] transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className={`bg-[#c56e6e] z-30 mx-auto my-8 w-10 h-10 uppercase rounded-full ${styles['or-divider']}`}>
          <div className="p-2 font-medium text-[#f4e1d2]">
            OR
          </div>
        </div>
        <div className="flex justify-center items-center mb-3">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

SignUpPage.noFilmBackground = true;

export default SignUpPage;
