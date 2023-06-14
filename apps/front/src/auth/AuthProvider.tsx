import { useState, useMemo, useEffect } from "react";
import { AuthContext, AuthContextValue } from "./AuthContext";
import { constants } from "@utils/constants";
import AuthService from "@services/AuthService";

type TypesAuthProvider = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: TypesAuthProvider) {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const login = useMemo(
    () => (displayname: string) => {
      setIsLogin(true);
      localStorage.setItem(constants.DISPLAYNAME_KEY, displayname);
    },
    []
  );

  const logout = useMemo(
    () => () => {
      setIsLogin(false);
      localStorage.removeItem(constants.DISPLAYNAME_KEY);
      AuthService.logout();
    },
    []
  );

  useEffect(() => {
    const displayName = localStorage.getItem(constants.DISPLAYNAME_KEY);
    if (displayName) {
      setIsLogin(true);
    }
  }, []);

  const value: AuthContextValue = {
    login,
    logout,
    isLogin,
    displayname: localStorage.getItem(constants.DISPLAYNAME_KEY) || "",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
