import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const LoginContext = React.createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export default function LoginProvider({ children }) {
  const router = useRouter();
  const pathName = router.pathname;
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    WindowFocusHandler();
    window.localStorage.getItem("login")
      ? setIsLogin(JSON.parse(window.localStorage.getItem("login")))
      : null;
  }, [isLogin]);

  // setInterval(() => {
  //   checkIfLog(setIsLogin, router, pathName);
  // }, 60100 * 15);

  // function loginLogout() {
  //   setIsLogin((prev) => !prev);
  // }

  function login() {
    setIsLogin(true);
    window.localStorage.setItem("login", true);
    window.localStorage.setItem("admin", true);
  }

  function logout() {
    setIsLogin(false);
    window.localStorage.setItem("login", false);
    window.localStorage.setItem("admin", false);
  }

  // User has switched back to the tab
  async function onFocus() {
    await checkIfLog(setIsLogin, router, pathName);
  }

  // User has switched away from the tab (AKA tab is hidden)
  async function onBlur() {
    await checkIfLog(setIsLogin, router, pathName);
  }

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
    <LoginContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

async function checkIfLog(setIsLogin, router, pathName) {
  const res = await fetch("../../api/auth/authenticate");
  const json = await res.json();
  if (res.status === 401) {
    window.localStorage.setItem("login", false);
    window.localStorage.setItem("admin", false);
    setIsLogin(false);
    if (pathName !== "/" && pathName !== "/check-in") {
      router.push("/");
    }
  }
  if (res.ok) {
    if (json.success) {
      window.localStorage.setItem("login", true);
      window.localStorage.setItem("admin", true);
      setIsLogin(true);
    }
  }
}
