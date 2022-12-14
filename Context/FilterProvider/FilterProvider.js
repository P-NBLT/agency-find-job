import React, { useState, useContext, useEffect } from "react";
import { useAgencies } from "../AgenciesProvider/AgenciesProvider";

const FilterContext = React.createContext();
const FilterUpdateContext = React.createContext();

export function useData() {
  return useContext(FilterContext);
}

export function useFilter() {
  return useContext(FilterUpdateContext);
}

function FilterProvider({ children }) {
  const agencies = useAgencies().agencies;
  const [listing, setListing] = useState();
  const [filterListing, setFilterListing] = useState();
  const [keywords, setKeywords] = useState();

  useEffect(() => {
    setFilterListing({
      agencies: agencies,
    });
  }, [agencies]);

  function handleTextInput(keyword, topic) {
    console.log("from provider", keyword, topic);
    setKeywords((current) => {
      return { ...current, [topic]: keyword };
    });
  }

  function handleCheckbox(value, topic, boolean) {
    let keywordsCopy = { ...keywords };

    if (boolean) {
      if (!keywordsCopy[topic]) {
        keywordsCopy[topic] = [];
      }
      keywordsCopy[topic].push(value);
    } else {
      keywordsCopy = {
        ...keywordsCopy,
        [topic]: keywords[topic].filter((option) => option !== value),
      };
      if (keywords[topic].length <= 1) {
        delete keywordsCopy.size;
      }
    }
    setKeywords(keywordsCopy);
  }

  const filterFunctions = {
    name: (agency, name) => agency.name.includes(name),
    location: (agency, location) =>
      agency.city.includes(location) || agency.region.includes(location),
    size: (agency, size) => size.includes(agency.size),
  };

  // this function may need in some case a param listingfromServer when the api return an update of the db.
  function submitFilterInput(listingfromServer) {
    const keysTofilterBy = Object.keys(keywords);
    let dataListing;
    if (listingfromServer) {
      dataListing = listingfromServer;
    } else {
      dataListing = agencies;
    }
    const output = dataListing.filter((agency) => {
      return keysTofilterBy.every((key) => {
        const filterFunction = filterFunctions[key];
        const filterValue = keywords[key];
        return filterFunction(agency, filterValue);
      });
    });
    setFilterListing({ agencies: output });
  }

  return (
    <FilterContext.Provider value={filterListing}>
      <FilterUpdateContext.Provider
        value={{
          submitFilterInput,
          handleTextInput,
          handleCheckbox,
          keywords,
        }}
      >
        {children}
      </FilterUpdateContext.Provider>
    </FilterContext.Provider>
  );
}

export default FilterProvider;
