import React from "react";
import PropTypes from "prop-types";
import styles from "./InfoBar.module.css";

const InfoBar = ({ obj, ...props }) => {
  const {
    id,
    userName,
    emailUser,
    companyName,
    city,
    region,
    size,
    website,
    logo,
    verified,
    verifiedBy,
    payload,
  } = obj;

  return (
    <>
      <tr className={styles.tr}>
        <td className={`${styles.tdBody} ${styles.user}`}>
          <div className={styles.content}>{userName}</div>
        </td>
        <td className={`${styles.tdBody} ${styles.user}`}>
          <div className={styles.content}>{emailUser}</div>
        </td>
        <td className={`${styles.tdBody} ${styles.company}`}>
          <div className={styles.content}>{companyName}</div>
        </td>
        <td className={`${styles.tdBody} ${styles.company}`}>
          <div className={styles.content}>{city}</div>
        </td>
        <td className={`${styles.tdBody} ${styles.company}`}>
          <div className={styles.content}>{region}</div>
        </td>
        <td className={`${styles.tdBody} ${styles.company}`}>
          <div className={styles.content}>{size}</div>
        </td>
        <td className={`${styles.tdBody} ${styles.company}`}>
          <a href={website} target="_blank" className={styles.content}>
            {website}
          </a>
        </td>
        <td className={`${styles.tdBody} ${styles.company}`}>
          <img className={`${styles.contentImg} ${styles.img}`} src={logo} />
        </td>
        <td className={`${styles.tdBody} ${styles.company}`}>
          <div className={styles.content}>{verified}</div>
        </td>
        <td className={`${styles.tdBody} ${styles.company}`}>
          <div className={styles.content}>{payload}</div>
        </td>
        <td className={`${styles.tdBody} `}>
          {props.action.map((el) => {
            return (
              <div key={el}>
                <label htmlFor={el}>{props.label ? props.label : el}</label>
                <input
                  type="radio"
                  name="el"
                  value={el}
                  id={id}
                  onChange={() => props.fun(id, el)}
                />
              </div>
            );
          })}
        </td>
      </tr>
    </>
  );
};

InfoBar.propTypes = {};

export default InfoBar;
