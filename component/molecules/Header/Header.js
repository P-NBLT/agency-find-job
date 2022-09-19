import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import { Toggle, Logo, Settings } from "../../atoms/index";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <Logo />
      <div className={styles.left}>
        <Toggle></Toggle>
        <Settings />
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
