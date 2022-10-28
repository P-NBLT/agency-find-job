import React from "react";
import PropTypes from "prop-types";
import styles from "./MenuItem.module.css";

const MenuItem = (props) => {
  return <div>{props.name}</div>;
};

MenuItem.propTypes = {};

export default MenuItem;
