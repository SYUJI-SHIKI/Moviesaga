import React, { useState } from "react";
import { useRouter } from "next/router";
import logIn from "../../../features/api/logIn";
import { useEffect } from "react";
import GoogleLoginButton from "../Google/GoogleButton";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token && token !== "{}") {
      router.push("/"); // 既にログインしている場合はルートページにリダイレクト
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
      console.log("UID:", localStorage.getItem("uid"));

      router.push("/");
    } catch (error) {
      console.error("ログインできませんでした", error);
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
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
      <GoogleLoginButton />
    </div>
  );
};

export default LogInPage;
