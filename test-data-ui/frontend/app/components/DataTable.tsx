import React from "react";
import {
  DataGrid,
  GridColDef,
  GridDownloadIcon,
  GridNoRowsOverlay,
  GridRowParams,
} from "@mui/x-data-grid";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";
import type Filter from "@models/Filter";
import type { Metadata } from "@models/Resource";
import { useNavigate } from "react-router-dom";
import { useFilterContext } from "@context/FilterContext";
import FilterMetadata from "@lib/FilterMetadata";
import { useDataContext } from "@context/DataContext";

const columns: GridColDef[] = [
  { field: "resourceType", headerName: "Resource Type", width: 200 },
  { field: "resourceId", headerName: "ID", width: 300 },
  { field: "project", headerName: "Project(s)", width: 200 },
  { field: "tag", headerName: "Tag(s)", width: 300 },
];

export type DataGridModel = {
  id: number;
  resourceId: string;
  resourceType: string;
  project: string;
  tag: string;
  filename: string;
};

const filterData = (filter: Filter, data: Metadata[]): DataGridModel[] => {
  const filtered: DataGridModel[] = [];
  data.forEach((row) => {
    if (FilterMetadata(filter, row)) {
      filtered.push({
        id: row.id,
        resourceId: row.resourceId,
        resourceType: row.type,
        project: row.projects.join(", "),
        tag: row.tags.join(", "),
        filename: row.filename,
      });
    }
  });
  return filtered;
};

const paginationModel = { page: 0, pageSize: 20 };

const NoPatientChosenMessage = () => (
  <Stack height="100%" alignItems="center" justifyContent="center">
    Please choose a patient.
  </Stack>
);

const DataTable = (): React.JSX.Element => {
  const { metadata, loading, empty, error } = useDataContext();
  const navigate = useNavigate();
  const { filter } = useFilterContext();

  const handleRowClick = (params: GridRowParams) => {
    const { resourceType, resourceId } = params.row;
    navigate(`/resource/${resourceType + "%2F" + resourceId}`);
  };

  if (loading) {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  }

  if (empty) {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <Alert severity="info">Server did not return any resources. Run a load to sync server with repository.</Alert>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <Alert severity="error">Error loading resources: {error}</Alert>
      </Stack>
    );
  }

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      {metadata && (
        <>
          <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" startIcon={<GridDownloadIcon />}>
              Download Current Search Results
            </Button>
          </Box>
          <DataGrid
            rows={filterData(filter, Object.values(metadata))}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20, 50]}
            onRowClick={handleRowClick}
            disableRowSelectionOnClick
            slots={{
              noRowsOverlay:
                filter.mode === "patient"
                  ? NoPatientChosenMessage // custom message when filter mode is patient and no patient is chosen
                  : GridNoRowsOverlay, // default
            }}
            sx={{ border: 0 }}
          />
        </>
      )}
    </Paper>
  );
};

export default DataTable;
