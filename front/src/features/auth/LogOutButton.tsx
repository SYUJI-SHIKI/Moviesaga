import React from "react";
import useLogOut from "./useLogOut";
import AuthLoadingScreen from "@/components/elements/Loading/AuthLoadingScreen";
import { Button } from "@/components/ui/button";

const LogOutButton: React.FC = () => {
  const { logOut, loading } = useLogOut();

  return (
    <div>
      {loading ? (
        <AuthLoadingScreen />
      ) : (
        <div className="text-rose-700 text-3xl font-bold hover:text-gray-300 mb-2 ">
          <Button onClick={logOut}
            className="bg-rose-600 border-white p-5 w-24 h-12"
          >
              ログアウト
          </Button>
        </div>
      )}
    </div>
  );
};

export default LogOutButton;