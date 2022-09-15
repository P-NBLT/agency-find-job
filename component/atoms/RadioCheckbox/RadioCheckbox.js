import React from "react";
import PropTypes from "prop-types";
import styles from "./RadioCheckbox.module.css";

const RadioCheckbox = ({ id, value, ...props }) => {
  return (
    <div className={styles.radioContainer}>
      <label htmlFor={id}>
        <input {...props} id={id} type="checkbox" />
        {id}
      </label>
    </div>
  );
};

RadioCheckbox.propTypes = {};

export default RadioCheckbox;
