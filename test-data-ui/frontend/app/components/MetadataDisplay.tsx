import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import type Resource from "@models/Resource";
import React from "react";

const MetadataRow = ({
  rowKey,
  name,
  value,
}: {
  rowKey: string;
  name: string;
  value: string;
}): React.JSX.Element => (
  <TableRow
    key={rowKey}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {name}
    </TableCell>
    <TableCell component="th" scope="row">
      {value}
    </TableCell>
  </TableRow>
);

const MetadataDisplay = ({
  metadata,
}: {
  metadata: Resource;
}): React.JSX.Element => {
  const metadataRows = [
    {
      rowKey: "ResourceType",
      name: "Resource Type",
      value: metadata.type,
    },
    { rowKey: "ResourceId", name: "Resource ID", value: metadata.resourceId },
    { rowKey: "Project", name: "Project", value: metadata.projects.join(',') },
    { rowKey: "Tag", name: "Tag", value: metadata.tags.join(',') },
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {metadataRows.map(({ rowKey, name, value }) => (
            <MetadataRow key={rowKey} rowKey={rowKey} name={name} value={value} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetadataDisplay;