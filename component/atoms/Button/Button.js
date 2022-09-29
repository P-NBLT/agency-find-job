import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";
import { classNameBuilderHelper } from "../../../util/functionHelper";

const Button = ({
  children,
  variant,
  display,
  size,
  margin,
  theme,
  padding,
  ...props
}) => {
  const DARKTHEME_STYLE = {};

  if (theme) {
    DARKTHEME_STYLE.color = theme ? "white" : "var(--dark-blue)";
  }
  let classNames;
  if (props.theme) variant = "dark";
  classNames = classNameBuilderHelper([variant, size, margin, padding], styles);
  return (
    <button
      {...props}
      className={`${classNames} ${styles.default}`}
      style={DARKTHEME_STYLE}
    >
      {children}
    </button>
  );
};

Button.propTypes = {};

export default Button;
