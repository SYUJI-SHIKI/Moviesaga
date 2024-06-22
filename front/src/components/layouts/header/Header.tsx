"use client";

import { useEffect, useState } from "react";
import BeforeHeader from "./BeforeHeader";
import AfterHeader from "./AfterHeader";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(`access-token`);
    console.log('Acxxxxxxxxxxxxcess Token:', token);
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const token = localStorage.getItem(`access-token`);
      setIsLoggedIn(!!token);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return isLoggedIn ? <AfterHeader /> : <BeforeHeader />;
}

export default Header;
