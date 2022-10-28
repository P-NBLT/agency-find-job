import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const LoginContext = React.createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export default function LoginProvider({ children }) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  console.log("label", isLogin);

  useEffect(() => {
    WindowFocusHandler();
    window.localStorage.getItem("login")
      ? setIsLogin(JSON.parse(window.localStorage.getItem("login")))
      : null;
  }, []);

  setInterval(() => {
    checkIfLog(setIsLogin, router);
  }, 60100 * 15);

  function loginLogout() {
    setIsLogin((prev) => !prev);
  }

  function login() {
    setIsLogin(true);
    window.localStorage.setItem("login", true);
  }

  function logout() {
    setIsLogin(false);
    window.localStorage.setItem("login", false);
  }

  // User has switched back to the tab
  const onFocus = () => {
    checkIfLog(setIsLogin, router);
  };

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    checkIfLog(setIsLogin, router);
  };

  function WindowFocusHandler() {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Calls onFocus when the window first loads
    onFocus();
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };

    return <></>;
  }

  return (
    <LoginContext.Provider value={{ isLogin, loginLogout, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

async function checkIfLog(setIsLogin, router) {
  console.log("hello");
  const res = await fetch("../../api/auth/authenticate");
  const json = await res.json();
  console.log(res);
  if (res.status === 401) {
    window.localStorage.setItem("login", false);
    setIsLogin(false);
    router.push("/");
  }
  if (res.ok) {
    if (json.success) {
      window.localStorage.setItem("login", true);
      setIsLogin(true);
    }
  }
}
