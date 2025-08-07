/**
 *  Search resources by patient: an autocomplete with all the patient ids.
 */

import { useFilterContext } from "@context/FilterContext";
import type FilterOptions from "@models/FilterOptions";
import { Autocomplete, FormControl, TextField } from "@mui/material";
import React from "react";

const PatientSearchBar = ({
  filterOptions,
}: {
  filterOptions: FilterOptions;
}): React.JSX.Element => {
  const { filter, setFilter } = useFilterContext();
  return (
    <FormControl>
      <Autocomplete
        disablePortal
        options={filterOptions.patient.toSorted((a, b) => a.localeCompare(b))}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Patient ID" />}
        value={filter.patient}
        onChange={(e, val) =>
          setFilter({
            ...filter,
            patient: val || "",
          })
        }
      />
    </FormControl>
  );
};

export default PatientSearchBar;
