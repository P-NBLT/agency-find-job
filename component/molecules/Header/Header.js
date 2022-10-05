import React from "react";
import styles from "./Header.module.css";
import { Toggle, Logo, LoginLogout } from "../../atoms/index";
import { useLogin } from "../../../Context/LoginProvider/LoginProvider";
import { useRouter } from "next/router";

const Header = (props) => {
  const logoutContext = useLogin().loginLogout;
  const router = useRouter();
  const pathName = router.pathname;

  async function logout() {
    const res = await fetch("../../api/auth/logout");
    const json = await res.json();
    logoutContext();
    if (pathName !== "/") router.push("/");
  }

  return (
    <div className={styles.header}>
      <Logo />
      <div className={styles.left}>
        <Toggle></Toggle>
        <LoginLogout fun={logout} />
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
