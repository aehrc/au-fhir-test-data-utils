/**
 *  Search bar wrapper to support multiple filter modes and load filter options from server.
 */
import React from "react";
import { Tabs, Tab, Box, Backdrop, CircularProgress } from "@mui/material";
import FilterSearchBar from "./FilterSearchBar";
import PatientSearchBar from "./PatientSearchBar";
import type { FilterMode } from "@models/Filter";
import { useFilterContext } from "@context/FilterContext";
import { useDataContext } from "@context/DataContext";

const SearchTabs = (): React.JSX.Element => {
  const { filterOptions, loading } = useDataContext();
  const { filter, setFilter } = useFilterContext();

  const handleModeChange = (
    event: React.SyntheticEvent,
    newValue: FilterMode
  ): void => {
    setFilter({
      ...filter,
      mode: newValue,
    });
  };

  const renderSearchBarByMode = (mode: FilterMode): React.JSX.Element => {
    switch (mode) {
      case "general":
        return <FilterSearchBar filterOptions={filterOptions} />;
      case "patient":
        return <PatientSearchBar filterOptions={filterOptions} />;
    }
  };

  return (
    <div>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {!loading && filterOptions && (
        <Box sx={{ width: "100%", padding: 2 }}>
          <Tabs
            value={filter.mode}
            onChange={handleModeChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="General Search" value="general" />
            <Tab label="Search by Patient" value="patient" />
          </Tabs>

          <Box sx={{ marginTop: 2 }}>{renderSearchBarByMode(filter.mode)}</Box>
        </Box>
      )}
    </div>
  );
};

export default SearchTabs;
