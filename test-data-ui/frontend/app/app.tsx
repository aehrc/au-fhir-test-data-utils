import React from "react";
import { BrowserRouter, Route,  Routes } from "react-router-dom";
import ResourceListPage from "./pages/ResourceListPage";
import ResourceDetailPage from "./pages/ResourceDetailPage";
import { FilterProvider } from "lib/context/FilterContext";
import { DataProvider } from "@lib/context/DataContext";

const App = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <DataProvider>
        <FilterProvider>
          <Routes>
            <Route path="/" element={<ResourceListPage />} />
            <Route path="/resource/:reference" element={<ResourceDetailPage />} />
          </Routes>
        </FilterProvider>
      </DataProvider>
    </BrowserRouter>
  );
};

export default App;
