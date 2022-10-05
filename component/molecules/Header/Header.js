import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import { Toggle, Logo, Settings, LoginLogout } from "../../atoms/index";
import { useLogin } from "../../../Context/LoginProvider/LoginProvider";
import Link from "next/link";

const Header = (props) => {
  const login = useLogin().isLogin;
  console.log("is login", login);

  async function logout() {
    const res = await fetch("api/auth/logout");
    const json = await res.json();
  }

  const credentials = !login ? (
    <Link href="/check-in">
      <p>Login</p>
    </Link>
  ) : (
    <p onClick={logout}>Logout</p>
  );

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
