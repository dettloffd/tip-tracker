import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: "62a02323161e5509490875a4",
  login: () => {},
  logout: () => {}
});
