import React from "react";
import { useState, createContext } from "react";

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser")) || null
  );
  const userIsLoggedIn = user !== null;
  const loginHandler = (user) => {
    setUser(user);
    localStorage.setItem("authUser", JSON.stringify(user));
  };
  const logoutHandler = () => {
    setUser(null);
    localStorage.setItem("authUser", null);
  };
  const valueContext = {
    user: user,
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
