import { useState, useMemo, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { AuthContext, AuthContextValue } from "./AuthContext";
import { constants } from "@utils/constants";

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
      localStorage.setItem(constants.AUTH_TOKEN_KEY, token);
    },
    []
  );

  const user = useMemo(() => {
    const token = localStorage.getItem(constants.AUTH_TOKEN_KEY);
    if (token) {
      const { displayName }: any = jwtDecode(token);
      return displayName;
    } else {
      return undefined;
    }
  }, []);

  const logout = useMemo(
    () => () => {
      setToken(undefined);
      setIsLogin(false);
      localStorage.removeItem(constants.AUTH_TOKEN_KEY);
    },
    []
  );

  useEffect(() => {
    const token = localStorage.getItem(constants.AUTH_TOKEN_KEY);
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
    user,
    isLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
