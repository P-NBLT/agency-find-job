import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Toggle, Logo, LoginLogout, Settings } from "../../atoms/index";
import { useLogin } from "../../../Context/LoginProvider/LoginProvider";
import { useRouter } from "next/router";

const Header = (props) => {
  const logoutContext = useLogin().loginLogout;
  const router = useRouter();
  const pathName = router.pathname;
  const [admin, setAdmin] = useState();

  useEffect(() => {
    // const admin = window.localStorage.getItem("admin");
    console.log("trigger");
    setAdmin(JSON.parse(window.localStorage.getItem("admin")));
  });

  async function logout() {
    const res = await fetch("../../api/auth/logout");
    const json = await res.json();
    logoutContext();
    if (pathName !== "/") router.push("/");
  }

  return (
    <div className={styles.header}>
      <Logo onClick={() => router.push("/")} />
      <div className={styles.left}>
        {/* <Toggle></Toggle> */}
        <Settings admin={admin} />
        <LoginLogout fun={logout} className={styles.login} />
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
