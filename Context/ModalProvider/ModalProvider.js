import React, { useState, useContext } from "react";
import { ModalFilterOptions } from "../../component/molecules";

const ModalContext = React.createContext();

export function useModal() {
  return useContext(ModalContext);
}

function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState();
  const [modalDeleteAgencyId, setModalDeleteAgencyId] = useState();

  function toggleModal(id) {
    setModalId(id);
    setIsOpen((prev) => !prev);
  }

  function handleModalDeleteAgencyId(id) {
    setModalDeleteAgencyId(id);
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        toggleModal,
        handleModalDeleteAgencyId,
        modalDeleteAgencyId,
        modalId,
      }}
    >
      <ModalFilterOptions /> {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
