import React, { useState } from "react";
import { useRouter } from "next/router";
import logIn from "@/features/auth/logIn";
import { useEffect } from "react";
import GoogleLoginButton from "../../../features/auth/GoogleButton";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import styles from "../authForm.module.css"

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
    <div className="flex justify-center items-center min-h-screen mb-10 bg-gradient-to-br from-[#dde3e6] via-[#518698] to-[#2c5364] animate-gradient-flow bg-[length:400%_400%] text-white">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg w-[450px] p-8 my-10 border border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out">
        <h1 className="text-2xl text-center mb-6 font-museo-slab">ログイン</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex rounded-md overflow-hidden">
            <label  htmlFor="email" className="bg-[#222222] px-4 py-3 flex items-center">
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
              placeholder="パスワード"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#00B9BC] text-white font-bold uppercase py-3 rounded-md hover:bg-[#197071] transition duration-300"
          >
              Login
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

export default LogInPage;
