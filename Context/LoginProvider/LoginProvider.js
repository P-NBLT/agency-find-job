import React, { useState, useContext } from "react";

const LoginContext = React.createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export default function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  function loginLogout() {
    setIsLogin((prev) => !prev);
  }

  return (
    <LoginContext.Provider value={{ isLogin, loginLogout }}>
      {children}
    </LoginContext.Provider>
  );
}
