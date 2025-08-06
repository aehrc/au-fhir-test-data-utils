import type { GeneralFilter } from "@models/Filter";
import type Filter from "@models/Filter";
import type { Metadata } from "@models/Resource";

const filterByCriteria = (filter: GeneralFilter, row: Metadata): boolean => {
  if (filter.resourceType !== "all" && row.type !== filter.resourceType) {
    return false;
  }
  if (
    filter.project !== "all" &&
    filter.project !== "none" &&
    !row.projects.includes(filter.project)
  ) {
    return false;
  }
  if (filter.project === "none" && row.projects.length > 0) {
    return false;
  }
  if (
    filter.tag !== "all" &&
    filter.tag !== "none" &&
    !row.tags.includes(filter.tag)
  ) {
    return false;
  }
  if (filter.tag === "none" && row.tags.length > 0) {
    return false;
  }
  if (filter.id.length > 0 && !row.resourceId.includes(filter.id)) {
    return false;
  }
  return true;
};

const filterByPatient = (patient: string, row: Metadata): boolean => {
  if (row.type === "Patient" && row.resourceId === patient) {
    return true;
  }
  return !!row.patient && row.patient === patient;
};

const FilterMetadata = (filter: Filter, row: Metadata): boolean => {
  switch (filter.mode) {
    case "general":
      return filterByCriteria(filter.general, row);
    case "patient":
      return filterByPatient(filter.patient, row);
  }
  return false;
};

export default FilterMetadata;