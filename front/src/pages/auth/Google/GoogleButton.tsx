import React from "react";
import authApi from "../../../features/api/auth";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse, } from "@react-oauth/google";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const GoogleLoginButton: React.FC = () => {
  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log("Googleログイン成功", credentialResponse);
    const { credential } = credentialResponse;
  
    try {
      const res = await authApi.post(
        "/auth/:provider/callback", // ここがRailsのエンドポイント
        {
          token: credential,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log("認証成功", res.data);
    } catch (error) {
      console.error("認証エラー", error);
    }
  };

  const handleLoginFailure = () => {
    console.error("Google認証失敗しました");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID as string}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
