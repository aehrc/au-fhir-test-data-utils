import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type FilterOptions from "@models/FilterOptions";
import { EmptyOptions } from "@models/FilterOptions";
import type { Metadata } from "@models/Resource";

type DataContextType = {
  filterOptions: FilterOptions;
  metadata: Metadata[];
  loading: boolean;
  error: string | null;
  empty: boolean;
  lazyFetch: () => void;
};

const DataContext = createContext<DataContextType>({
  filterOptions: EmptyOptions,
  metadata: [],
  loading: true,
  error: null,
  empty: false,
  lazyFetch: () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(EmptyOptions);
  const [metadata, setMetadata] = useState<Metadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetched = useRef<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [filtersRes, metadataRes] = await Promise.all([
        fetch("/api/filters"),
        fetch("/api/metadata"),
      ]);
      if (!filtersRes.ok || !metadataRes.ok) {
        throw new Error("Failed to fetch data from server");
      }
      const filters = await filtersRes.json();
      const metadata = await metadataRes.json();
      setFilterOptions(filters);
      setMetadata(metadata);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setFilterOptions(EmptyOptions);
      setMetadata([]);
    } finally {
      setLoading(false);
    }
  };

  const lazyFetch = () => {
    if (!fetched.current) {
      fetched.current = true;
      fetchData();
    }
  };

  const empty = !loading && !error && metadata.length === 0;

  const contextValue = React.useMemo(
    () => ({
      filterOptions,
      metadata,
      loading,
      error,
      empty,
      lazyFetch,
    }),
    [filterOptions, metadata, loading, error, empty]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  useEffect(() => {
    context.lazyFetch();
  }, []);
  return context;
};
