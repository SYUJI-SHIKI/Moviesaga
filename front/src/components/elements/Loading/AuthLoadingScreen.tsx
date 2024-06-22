import React from "react";

const AuthLoadingScreen: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
      <div className="text-2xl text-black">
        Loading...
      </div>
    </div>
  );
};

export default AuthLoadingScreen;