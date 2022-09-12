import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import styles from "./ModalFilterOptions.module.css";
import { useModal } from "../../../../Context/ModalProvider/ModalProvider";
import { RadioCheckbox } from "../../../atoms";
import { useTheme } from "../../../../Context/ThemeProvider/ThemeProvider";

const ModalFilterOptions = ({ children, ...props }) => {
  const isOpen = useModal().isOpen;
  const toggle = useModal().toggleModal;
  const darkTheme = useTheme();

  const INNERDIV_STYLE = {
    backgroundColor: darkTheme ? "var(--midnight)" : "white",
    color: darkTheme ? "var(--dark-grey)" : "black",
  };
  if (isOpen) {
    return ReactDom.createPortal(
      <>
        <div className={styles.outerDiv} />
        <div className={styles.innerDiv} style={INNERDIV_STYLE}>
          <div className={styles.closeModal} onClick={toggle}>
            X
          </div>
          <div className={styles.childrenContainer}>{children}</div>
        </div>
      </>,
      document.getElementById("portal")
    );
  }
};
ModalFilterOptions.propTypes = {};

export default ModalFilterOptions;
