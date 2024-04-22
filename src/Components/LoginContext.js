import React, { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const getInitialLoginState = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loginTimestamp = localStorage.getItem("loginTimestamp");

    if (!isLoggedIn || !loginTimestamp) {
      return false;
    }

    const currentTime = new Date().getTime();
    const diff = currentTime - parseInt(loginTimestamp, 10);

    // Check if the difference is less than 5 minutes (300,000 milliseconds)
    return diff < 30000000;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(getInitialLoginState);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loginTimestamp", new Date().getTime().toString());
    } else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loginTimestamp");
    }
  }, [isLoggedIn]);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
