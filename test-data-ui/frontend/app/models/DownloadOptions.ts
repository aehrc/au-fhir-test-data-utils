import type Filter from "./Filter";
import { DefaultFilter, type GeneralFilter } from "./Filter";

export const InitialOption = (): DownloadOptions => ({
  filter: DefaultFilter(),
  withReferences: false,
  recursive: false,
});

type ExtendedGeneralFilter = GeneralFilter & {
  idExact?: string; // Exact match for resource ID, used when downloading a specific resource
};

type ExtendedFilter = Omit<Filter, "general"> & {
  general: ExtendedGeneralFilter;
};

type DownloadOptions = {
  filter: ExtendedFilter;
  withReferences: boolean;
  recursive: boolean;
};

export default DownloadOptions;
