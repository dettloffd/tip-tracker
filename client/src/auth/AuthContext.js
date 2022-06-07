import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: "5f0aa38f2a9f992d74ff4533",
  login: () => {},
  logout: () => {}
});
