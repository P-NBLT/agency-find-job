import React, { useState, useContext } from "react";
import { PrismaClient } from "@prisma/client";

const AgenciesContext = React.createContext();

export function useAgencies() {
  return useContext(AgenciesContext);
}

function AgenciesProvider({ children }) {
  const [agencies, setAgencies] = useState();

  function handleAgenciesFromServer(serverData) {
    setAgencies(serverData);
  }

  return (
    <AgenciesContext.Provider value={{ agencies, handleAgenciesFromServer }}>
      {children}
    </AgenciesContext.Provider>
  );
}
export default AgenciesProvider;
