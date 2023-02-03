import { createContext } from "react";

export interface AuthContextValue {
  token: string | undefined;
  login: (token: string | ((token: string) => string)) => void;
  logout: () => void;
  isLogin: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  token: undefined,
  login: () => {},
  logout: () => {},
  isLogin: false,
});
