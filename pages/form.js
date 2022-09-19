import React from "react";
import PropTypes from "prop-types";
import { AgencyForm } from "../component/organism";
import { Header } from "../component/molecules";
import styles from "../styles/Form.module.css";

const form = (props) => {
  return (
    <>
      <div className={styles.body}>
        <Header />
        <AgencyForm />
      </div>
    </>
  );
};

form.propTypes = {};

export default form;
