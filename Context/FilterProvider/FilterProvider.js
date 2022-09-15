import React, { useState, useContext } from "react";
import { dataSet } from "../../data/data";

const FilterContext = React.createContext();
const FilterUpdateContext = React.createContext();

export function useData() {
  return useContext(FilterContext);
}

export function useFilter() {
  return useContext(FilterUpdateContext);
}

function FilterProvider({ children }) {
  const [listing, setListing] = useState(dataSet);
  const [filterListing, setFilterListing] = useState({
    agencies: listing.agencies,
  });
  const [keywords, setKeywords] = useState({});

  function handleTextInput(keyword, topic) {
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
      if (keywords[topic].length === 0) {
        delete keywordsCopy.size;
      }
    }
    setKeywords(keywordsCopy);
  }

  const filterFunctions = {
    name: (agency, name) => agency.name.includes(name),
    location: (agency, location) =>
      agency.city.includes(location) || agency.region.includes(location),
    size: (agency, size) => size.includes(agency.companySize),
  };

  function submitFilterInput() {
    const keysTofilterBy = Object.keys(keywords);
    const output = filterListing.agencies.filter((agency) => {
      return keysTofilterBy.every((key) => {
        const filterFunction = filterFunctions[key];
        const filterValue = keywords[key];
        return filterFunction(agency, filterValue);
      });
    });
    setListing({ agencies: output });
  }

  return (
    <FilterContext.Provider value={listing}>
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
