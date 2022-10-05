import React from "react";
import PropTypes from "prop-types";

import { FaSpinner } from "react-icons/fa";
import styles from "./Loading.module.css";

const Loading = (props) => {
  return (
    <div className={styles.container}>
      <FaSpinner className={styles.spinner} />
    </div>
  );
};

Loading.propTypes = {};

export default Loading;
