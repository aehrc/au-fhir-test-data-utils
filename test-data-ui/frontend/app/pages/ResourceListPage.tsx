import React from "react";
import SearchBar from "@components/SearchBar";
import DataTable from "@components/DataTable";
import Download from "@components/Download";

const ResourceList = (): React.JSX.Element => {
  return (
    <div>
      <main>
        <SearchBar />
        <Download reference={null} />
        <DataTable />
      </main>
    </div>
  );
};

export default ResourceList;