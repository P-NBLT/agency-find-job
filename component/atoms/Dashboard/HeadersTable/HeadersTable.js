import React from "react";
import PropTypes from "prop-types";
import styles from "./HeadersTable.module.css";

const HeadersTable = (props) => {
  return (
    <thead className={styles.thead}>
      <tr className={styles.tr}>
        <td className={`${styles.tdHead} ${styles.user}`}>
          <div className={styles.tHeadContent}>User name</div>
        </td>
        <td className={`${styles.tdHead} ${styles.user}`}>
          <div className={styles.tHeadContent}>User email</div>
        </td>
        <td className={`${styles.tdHead} ${styles.company}`}>
          <div className={styles.tHeadContent}>Company name</div>
        </td>
        <td className={`${styles.tdHead} ${styles.company}`}>
          <div className={styles.tHeadContent}>city</div>
        </td>
        <td className={`${styles.tdHead} ${styles.company}`}>
          <div className={styles.tHeadContent}>region</div>
        </td>
        <td className={`${styles.tdHead} ${styles.company}`}>
          <div className={styles.tHeadContent}>size</div>
        </td>
        <td className={`${styles.tdHead} ${styles.company}`}>
          <div className={styles.tHeadContent}>website</div>
        </td>
        <td className={`${styles.tdHead} ${styles.company}`}>
          <div className={styles.tHeadContent}>Logo</div>
        </td>
        <td className={`${styles.tdHead} ${styles.company}`}>
          <div className={styles.tHeadContent}>verified</div>
        </td>
        <td className={`${styles.tdHead} ${styles.company}`}>
          <div className={styles.tHeadContent}>payload</div>
        </td>
        <td className={`${styles.tdHead} `}>
          <div className={styles.tHeadContent}>Action</div>
        </td>
      </tr>
    </thead>
  );
};

HeadersTable.propTypes = {};

export default HeadersTable;
