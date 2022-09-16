import React from "react";
import PropTypes from "prop-types";
import styles from "./Settings.module.css";
import { useRouter } from "next/router";
import { AiFillSetting } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import {
  useTheme,
  useToggle,
} from "../../../Context/ThemeProvider/ThemeProvider";
import { Toggle } from "../index";

const Settings = (props) => {
  const darkTheme = useTheme();
  const toggle = useToggle();
  const router = useRouter();
  const SETTINGS_STYLE = {
    color: darkTheme ? "var(--dark-blue)" : "white",
  };
  return (
    <>
      <div className={styles.largeScreen}>
        <BsFillPersonFill
          style={SETTINGS_STYLE}
          className={styles.settingPic}
          onClick={() => router.push("./login")}
        />
      </div>
      <div>
        <label className={styles.mobile}>
          <AiFillSetting style={SETTINGS_STYLE} className={styles.settingPic} />
          <input
            type="checkbox"
            className={styles.settingsChekbox}
            id="settingsChekbox"
          />
          <div className={styles.settingsOtpions}>
            <div className={styles.settingsTheme} onClick={toggle}>
              {darkTheme ? <div>lightTheme</div> : <div>darkTheme</div>}
            </div>
            <div
              className={styles.settingsLogin}
              onClick={() => router.push("./login")}
            >
              Login
            </div>
          </div>
        </label>
      </div>
    </>
  );
};

Settings.propTypes = {};

export default Settings;
