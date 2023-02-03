import { useState, useMemo, useEffect } from "react";
import { AuthContext, AuthContextValue } from "./AuthContext";

type TypesAuthProvider = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: TypesAuthProvider) {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const login = useMemo(
    () => (token: any) => {
      setToken(token);
      setIsLogin(true);
      localStorage.setItem("token", token);
    },
    []
  );

  const logout = useMemo(
    () => () => {
      setToken(undefined);
      setIsLogin(false);
      localStorage.removeItem("token");
    },
    []
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const value: AuthContextValue = {
    token,
    login,
    logout,
    isLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
