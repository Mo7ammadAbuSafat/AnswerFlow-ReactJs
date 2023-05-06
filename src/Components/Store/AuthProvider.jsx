import axios from "axios";
import React, { useEffect } from "react";
import { useState, createContext } from "react";

const AuthContext = createContext({
  token: null,
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  const userIsLoggedIn = user !== null;

  const loginHandler = (token) => {
    localStorage.setItem("authToken", token);
    setToken(token);
  };
  const logoutHandler = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7127/api/identification",
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        const user = response.data;
        localStorage.setItem("authUser", JSON.stringify(user));
        setUser(user);
      } catch (error) {
        console.error(error);
        setUser(null);
        setToken(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
      }
    };

    if (token) {
      fetchUser();
    } else {
      setUser(null);
      localStorage.removeItem("authUser");
    }
  }, [token]);
  const valueContext = {
    token: token,
    user: user,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
