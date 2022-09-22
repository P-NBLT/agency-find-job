import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = React.forwardRef(function inputComponent(
  { name, label, ...props },
  ref
) {
  //   console.log({ ...register });
  console.log("ref", ref);
  console.log("props", props);
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input ref={ref} {...props} className={`${styles.default}`} />
    </>
  );
});

Input.propTypes = {};

export default Input;
