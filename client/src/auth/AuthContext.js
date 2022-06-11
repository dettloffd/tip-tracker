import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: "62a27d91edd5427ca690330c",
  login: () => {},
  logout: () => {}
});
// 62a27d91edd5427ca690330c