import React, { createContext, useContext, useMemo, useState } from 'react';
import type Filter from '@models/Filter';
import { DefaultFilter } from '@models/Filter';

interface FilterContextType {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

const FilterContext = createContext<FilterContextType | undefined >(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState<Filter>(DefaultFilter);
  const value = useMemo(() => ({ filter, setFilter }), [filter]);
  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilterContext must be used within a FilterProvider');
  return context;
};
