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

const Settings = ({ admin, ...props }) => {
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
          onClick={() => router.push("./form")}
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
            {admin && (
              <div
                className={styles.settingsDashboard}
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </div>
            )}

            <div
              className={styles.settingsLogin}
              onClick={() => router.push("./agencies/new")}
            >
              Add an Agency
            </div>
            <div className={styles.settingsTheme}>
              <Toggle />
            </div>
          </div>
        </label>
      </div>
    </>
  );
};

Settings.propTypes = {};

export default Settings;
