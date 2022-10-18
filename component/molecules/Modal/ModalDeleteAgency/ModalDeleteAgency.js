import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import styles from "./ModalDeleteAgency.module.css";
import { useModal } from "../../../../Context/ModalProvider/ModalProvider";
import { useTheme } from "../../../../Context/ThemeProvider/ThemeProvider";

const ModalDeleteAgency = ({ children, id, ...props }) => {
  const isOpen = useModal().isOpen;
  const toggle = useModal().toggleModal;
  const modalId = useModal().modalId;
  const darkTheme = useTheme();

  const INNERDIV_STYLE = {
    backgroundColor: darkTheme ? "var(--midnight)" : "white",
    color: darkTheme ? "var(--dark-grey)" : "black",
  };

  console.log("hello from modal delete");

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
      document.getElementById("portalAgency")
    );
  }
};
ModalDeleteAgency.propTypes = {};

export default ModalDeleteAgency;
