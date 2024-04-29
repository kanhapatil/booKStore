import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

const ContextProvider = ({ children }) => {
  const [filterCity, setFilterCity] = useState("");

  return (
    <FilterContext.Provider value={{filterCity, setFilterCity}}>
      {children}
    </FilterContext.Provider>
  );
};

export {ContextProvider}; 