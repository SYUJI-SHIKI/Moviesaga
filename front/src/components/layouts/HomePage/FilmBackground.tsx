import React, { ReactNode } from "react";
import Grain from "@/components/elements/Grain/Grain";
import styles from "./HomePage.module.css"

interface FilmBackgroundProps {
  children: ReactNode;
}

const FilmBackground: React.FC<FilmBackgroundProps> = ({ children }) => {
  return (
    <div className={`relative flex flex-row contrast-75 min-h-screen max-w-full z-10 m-0 p-0 overflow-x-hidden ${styles["bg-half-repeat"]}`}>
      <div className="fixed inset-0 z-20 overflow-x-hidden">
        <Grain />
      </div>
      <div className="flex flex-col items-start bg-black">
        <div className="flex flex-col items-start bg-black p-4">
            {Array.from({ length: 24 }).map((_, index) => (
              <div key={index} className="w-10 h-6 bg-amber-50 rounded-sm my-3" ></div>
            ))}
        </div>
      </div>
      <div className="flex flex-col items-center h-full w-full z-20">
        {children}
      </div>
      <div className="flex flex-col items-end bg-black ">
        <div className="flex flex-col items-end bg-black p-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="w-10 h-6 bg-amber-50 rounded-sm my-3"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilmBackground;