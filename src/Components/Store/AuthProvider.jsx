import React from "react";
import { useState, createContext } from "react";

const AuthContext = createContext({
  userId: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
export const AuthContextProvider = (props) => {
  const [userId, setUserId] = useState(null);
  const userIsLoggedIn = !!userId;
  const loginHandler = (userId) => {
    setUserId(userId);
  };
  const logoutHandler = () => {
    setUserId(null);
  };
  const valueContext = {
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={valueContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
