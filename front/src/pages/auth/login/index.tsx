import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import logIn from "@/features/auth/logIn";
import GoogleLoginButton from "../../../features/auth/GoogleButton";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import WeakGrain from "@/components/elements/Grain/WeakGrain";
import styles from "../authForm.module.css";
import Link from "next/link";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token && token !== "{}") {
      router.push("/");
    }
  }, [router]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await logIn(email, password);
      console.log("Response:", response);
      console.log("Headers:", response.data);
      console.log("Access Token:", localStorage.getItem("access-token"));
      console.log("Client:", localStorage.getItem("client"));
      console.log("UID:", localStorage.getItem("uuid"));
      window.dispatchEvent(new Event("storage"));
      router.push("/");
    } catch (error) {
      console.error("ログインできませんでした", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-20 overflow-x-hidden">
        <WeakGrain />
      </div>
      <div className="flex justify-center items-center min-h-screen w-full p-2 max-sm:items-start bg-gradient-to-br from-[#d9bf6a] via-[#a49742] to-[#f4e32a] animate-gradient-flow bg-[length:400%_400%] text-[#2C2410]">
        <div className="bg-[#F2E8B3]/90 backdrop-blur-sm flex flex-col items-center justify-center mb-5 z-30 max-sm:mt-32 rounded-xl shadow-2xl p-5 md:w-96 md:p-8 border-2 border-[#8C7A1D] hover:shadow-3xl transition-all duration-300 ease-in-out transform">
          <h1 className="text-3xl text-center mb-6 font-serif text-[#4A3F10] shadow-text">ログイン</h1>
          <form onSubmit={handleLogin} className="space-y-6 w-full">
            <div className="flex rounded-md overflow-hidden shadow-md">
              <label htmlFor="email" className="bg-[#8C7A1D] px-4 py-3 flex items-center text-[#F2E8B3]">
                <MdOutlineEmail className="text-xl" />
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#F2E8B3] text-[#4A3F10] focus:bg-[#E6D78C] transition duration-300"
                placeholder="メールアドレス"
                required
              />
            </div>
            <div className="flex rounded-md overflow-hidden shadow-md">
              <label htmlFor="password" className="bg-[#8C7A1D] px-4 py-3 flex items-center text-[#F2E8B3]">
                <RiLockPasswordLine className="text-xl" />
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#F2E8B3] text-[#4A3F10] focus:bg-[#E6D78C] transition duration-300"
                placeholder="パスワード"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#8C7A1D] text-[#F2E8B3] font-bold uppercase py-3 rounded-md hover:bg-[#A58E2D] transition duration-300 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </form>
          <div className={`bg-[#8C7A1D] mx-auto my-6 w-12 h-12 uppercase rounded-full ${styles['or-divider']} shadow-lg flex items-center justify-center`}>
            <div className="font-medium text-[#F2E8B3] text-lg ">
              OR
            </div>
          </div>
          <div className="flex justify-center items-center mb-5">
            <Link href="/auth/signUp">
              会員登録はこちらから
            </Link>
          </div>
          <div className="flex justify-center items-center md:m-0  mb-3">
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </>
  );
};

LogInPage.noFilmBackground = true;

export default LogInPage;