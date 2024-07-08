import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {

      const token = localStorage.getItem("access-token");
      const uuid = localStorage.getItem("uuid");
      const client = localStorage.getItem("client");

      if (token && uuid && client) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth()
  }, []);

  return { isAuthenticated, isLoading };
};