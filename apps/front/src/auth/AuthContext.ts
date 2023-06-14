import { createContext } from "react";

export interface AuthContextValue {
  login: (displayname: string) => void;
  logout: () => void;
  isLogin: boolean;
  displayname?: string;
}

export const AuthContext = createContext<AuthContextValue>({
  login: () => {},
  logout: () => {},
  isLogin: false,
  displayname: undefined,
});
