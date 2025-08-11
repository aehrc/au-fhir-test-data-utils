/**
 * Model for filter state
 */

export type FilterMode = "general" | "patient";

export const DefaultFilter = (): Filter => ({
  mode: "general",
  general: {
    resourceType: "all",
    project: "all",
    tag: "all",
    id: "",
  },
  patient: "",
});

export type GeneralFilter = {
  resourceType: string;
  project: string;
  tag: string;
  id: string;
};

type Filter = {
  mode: FilterMode;
  general: GeneralFilter;
  patient: string;
};

export default Filter;
