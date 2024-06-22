import React from "react";
import useLogOut from "./useLogOut";
import AuthLoadingScreen from "@/components/elements/Loading/AuthLoadingScreen";

const LogOutButton: React.FC = () => {
  const { logOut, loading } = useLogOut();

  return (
    <div>
      {loading ? (
        <AuthLoadingScreen />
      ) : (
        <div className="text-red-400 hover:text-gray-300 mb-2 ">
          <button onClick={logOut}>ログアウト</button>
        </div>
      )}
    </div>
  );
};

export default LogOutButton;