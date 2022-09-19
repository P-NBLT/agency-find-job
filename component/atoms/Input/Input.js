import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = ({ register, label, ...props }) => {
  //   console.log({ ...register });
  return (
    <>
      <label htmlFor={register.name}>{label}</label>
      <input {...props} {...register} className={`${styles.default}`} />
    </>
  );
};

Input.propTypes = {};

export default Input;
