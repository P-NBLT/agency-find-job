import React from "react";
import PropTypes from "prop-types";
import { HeadersTable } from "../../../atoms";
import styles from "./Table.module.css";

const Table = ({ children, title, ...props }) => {
  return (
    <div className={styles.tableContainer}>
      {title && <h3>{title}</h3>}
      <table className={styles.table}>
        <HeadersTable />

        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

Table.propTypes = {};

export default Table;
