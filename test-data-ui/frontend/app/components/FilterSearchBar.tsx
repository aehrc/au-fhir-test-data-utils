import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFilterContext } from "@context/FilterContext";
import type FilterOptions from "@models/FilterOptions";
import type Filter from "@models/Filter";

type FilterProps = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filterOptions: FilterOptions;
};

const ResourceTypeSelect = ({
  filter,
  setFilter,
  filterOptions,
}: FilterProps): React.JSX.Element => (
  <FormControl>
    <InputLabel id="resourceType-label">Resource Type</InputLabel>
    <Select
      labelId="resourceType-label"
      id="resourceType-select"
      value={filter.general.resourceType}
      style={{ width: "300px", marginBottom: "10px", marginRight: 10 }}
      onChange={(e) =>
        setFilter({
          ...filter,
          general: {
            ...filter.general,
            resourceType: e.target.value,
          },
        })
      }
    >
      <MenuItem value={"all"}>All</MenuItem>
      {filterOptions.resourceType
        .toSorted((a, b) => a.localeCompare(b))
        .map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
    </Select>
  </FormControl>
);

const ProjectSelect = ({
  filter,
  setFilter,
  filterOptions,
}: FilterProps): React.JSX.Element => (
  <FormControl>
    <InputLabel id="project-label">Project</InputLabel>
    <Select
      labelId="project-label"
      id="project-select"
      value={filter.general.project}
      style={{ width: "300px", marginBottom: "10px", marginRight: 10 }}
      onChange={(e) =>
        setFilter({
          ...filter,
          general: {
            ...filter.general,
            project: e.target.value,
          },
        })
      }
    >
      <MenuItem value={"all"}>All</MenuItem>
      {filterOptions.project.map((project) => (
        <MenuItem key={project} value={project}>
          {project}
        </MenuItem>
      ))}
      <MenuItem value={"none"}>None</MenuItem>
    </Select>
  </FormControl>
);

const TagSelect = ({
  filter,
  setFilter,
  filterOptions,
}: FilterProps): React.JSX.Element => (
  <FormControl>
    <InputLabel id="tag-label">Tag</InputLabel>
    <Select
      labelId="tag-label"
      id="tag-select"
      value={filter.general.tag}
      style={{ width: "300px", marginBottom: "10px", marginRight: 10 }}
      onChange={(e) =>
        setFilter({
          ...filter,
          general: {
            ...filter.general,
            tag: e.target.value,
          },
        })
      }
    >
      <MenuItem value={"all"}>All</MenuItem>
      {filterOptions.tag.map((tag) => (
        <MenuItem key={tag} value={tag}>
          {tag}
        </MenuItem>
      ))}
      <MenuItem value={"none"}>None</MenuItem>
    </Select>
  </FormControl>
);

const IdTextField = ({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}): React.JSX.Element => (
  <FormControl>
    <TextField
      id="resourceId-input"
      label="Resource ID"
      variant="outlined"
      value={filter.general.id}
      onChange={(e) =>
        setFilter({
          ...filter,
          general: {
            ...filter.general,
            id: e.target.value,
          },
        })
      }
    />
  </FormControl>
);

const FilterSearchBar = ({
  filterOptions,
}: {
  filterOptions: FilterOptions;
}): React.JSX.Element => {
  const { filter, setFilter } = useFilterContext();
  return (
    <div>
      <ResourceTypeSelect
        filter={filter}
        setFilter={setFilter}
        filterOptions={filterOptions}
      />
      <ProjectSelect
        filter={filter}
        setFilter={setFilter}
        filterOptions={filterOptions}
      />
      <TagSelect
        filter={filter}
        setFilter={setFilter}
        filterOptions={filterOptions}
      />
      <IdTextField
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};
export default FilterSearchBar;
