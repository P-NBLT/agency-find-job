import React, { useContext, useState } from "react";

const PaginationContext = React.createContext();

export function usePagination() {
  return useContext(PaginationContext);
}

function PaginationProvider({ children }) {
  const [pages, setPages] = useState(0);
  const [cards, setCards] = useState(0);

  function reset() {
    setPages(0);
  }

  function incrementPage() {
    setPages((current) => (current += 1));
    setCards((current) => (current += 1));
  }
  function decrementPage() {
    if (pages > 0) {
      setPages((current) => (current -= 1));
      setCards((current) => (current -= 1));
    }
  }

  function loadMoreCards() {
    setCards((current) => (current += 1));
  }

  return (
    <PaginationContext.Provider
      value={{ pages, cards, incrementPage, decrementPage, loadMoreCards }}
    >
      {children}
    </PaginationContext.Provider>
  );
}
export default PaginationProvider;
