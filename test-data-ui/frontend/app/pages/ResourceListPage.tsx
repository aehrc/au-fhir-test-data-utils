import React from "react";
import SearchBar from "@components/SearchBar";
import DataTable from "@components/DataTable";

const ResourceList = (): React.JSX.Element => {
  return (
    <div>
      <main>
        <SearchBar />
        <DataTable />
      </main>
    </div>
  );
};

export default ResourceList;