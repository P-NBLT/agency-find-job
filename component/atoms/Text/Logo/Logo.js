import React from "react";
import PropTypes from "prop-types";
import styles from "./Logo.module.css";

const Logo = ({ children, ...props }) => {
  return (
    <h2 {...props} className={styles.logo}>
      devjobs
    </h2>
  );
};

Logo.propTypes = {};

export default Logo;
