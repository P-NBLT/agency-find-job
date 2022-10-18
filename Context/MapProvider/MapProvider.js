import React, { useState, useContext } from "react";

const MapContext = React.createContext();

export function useMapProvider() {
  return useContext(MapContext);
}

function MapProvider({ children, ...props }) {
  const [mapIsOpen, setMapIsOpen] = useState(false);

  function toggleMap() {
    return setMapIsOpen((prev) => !prev);
  }

  return (
    <MapContext.Provider value={{ mapIsOpen, toggleMap }}>
      {children}
    </MapContext.Provider>
  );
}

export default MapProvider;
