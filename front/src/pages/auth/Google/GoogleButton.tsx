import React from "react";
import authApi from "../../../features/api/auth";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const GoogleLoginButton: React.FC = () => {
  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log("Googleログイン成功", credentialResponse);
    const { credential } = credentialResponse;

    try {
      const res = await authApi.post(
        "/api/v1/auth/google_oauth2/callback",
        {
          token: credential,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      console.log("Backend Response", data);
    } catch (error) {
      console.error("Error sending token to backend:", error);
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
