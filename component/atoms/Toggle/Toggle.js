import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Toggle.module.css";
import { MdWbSunny } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";
import { useToggle } from "../../../Context/ThemeProvider/ThemeProvider";

const Toggle = (props) => {
  const toggleTheme = useToggle();

  return (
    <div className={styles["toggle-container"]}>
      <MdWbSunny className={styles.icon} />

      <div className={`${styles.button} ${styles.r}`} id="button-1">
        <input
          type="checkbox"
          className={styles["checkbox"]}
          onChange={toggleTheme}
        />
        <div className={styles["knobs"]}></div>
        <div className={styles["layer"]}></div>
      </div>

      <RiMoonFill className={styles.icon} />
    </div>
  );
};

Toggle.propTypes = {};

export default Toggle;
