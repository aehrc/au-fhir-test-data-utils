/**
 * Model for filter options.
 */

type FilterOptions = {
  resourceType: string[];
  project: string[];
  tag: string[];
  patient: string[];
};

export const EmptyOptions: FilterOptions = {
  resourceType: [],
  project: [],
  tag: [],
  patient: [],
};

export default FilterOptions;
