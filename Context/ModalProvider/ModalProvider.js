import React, { useState, useContext } from "react";
import { ModalFilterOptions } from "../../component/molecules";

const ModalContext = React.createContext();

export function useModal() {
  return useContext(ModalContext);
}

function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState();

  function toggleModal(id) {
    setModalId(id);
    setIsOpen((prev) => !prev);
  }

  return (
    <ModalContext.Provider value={{ isOpen, toggleModal, modalId }}>
      <ModalFilterOptions /> {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
