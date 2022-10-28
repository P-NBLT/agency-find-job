import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLogin } from "../../../Context/LoginProvider/LoginProvider";
import { useTheme } from "../../../Context/ThemeProvider/ThemeProvider";
import Link from "next/link";
import styles from "./LoginLogout.module.css";

const LoginLogout = ({ fun, ...props }) => {
  const login = useLogin().isLogin;
  const drakTheme = useTheme();
  console.log(login);
  const LOGIN_STYLE = {
    color: "white",
  };

  const credentials = !login ? (
    <Link href="/check-in">
      <p className={styles.login} style={LOGIN_STYLE}>
        Login
      </p>
    </Link>
  ) : (
    <p onClick={fun} className={styles.login} style={LOGIN_STYLE}>
      Logout
    </p>
  );

  return <>{credentials}</>;
};

LoginLogout.propTypes = {};

export default LoginLogout;
