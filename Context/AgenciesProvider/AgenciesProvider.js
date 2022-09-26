import React, { useState, useContext } from "react";
import { PrismaClient } from "@prisma/client";

const AgenciesContext = React.createContext();

export function useAgencies() {
  return useContext(AgenciesContext);
}

function AgenciesProvider({ children }) {
  const [agencies, setAgencies] = useState();
  const [agencyCardId, setAgencyCardId] = useState();
  function handleAgenciesFromServer(serverData) {
    setAgencies(serverData);
  }
  function handleCardId(id) {
    setAgencyCardId(id);
  }
  return (
    <AgenciesContext.Provider
      value={{ agencies, handleAgenciesFromServer, handleCardId, agencyCardId }}
    >
      {children}
    </AgenciesContext.Provider>
  );
}
export default AgenciesProvider;
