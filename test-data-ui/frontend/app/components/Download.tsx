import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import type DownloadOptions from "@models/DownloadOptions";
import { InitialOption } from "@models/DownloadOptions";
import { useFilterContext } from "@lib/context/FilterContext";

const Download = ({
  reference,
}: {
  reference: string | null;
}): React.JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [options, setOptions] = useState<DownloadOptions>(InitialOption());
  const { filter } = useFilterContext();

  const handleDownload = async () => {
    try {
      if (reference) {
        const [resourceType, resourceId] = reference.split("/");
        options.filter.general.resourceType = resourceType;
        options.filter.general.idExact = resourceId;
      } else {
        options.filter = filter;
      }
      const response = await fetch("/api/download/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const blob = await response.blob();

      const contentDisposition = response.headers.get("content-disposition");
      const filenameMatch = contentDisposition?.match(/filename="?(.+?)"?$/);
      const filename = filenameMatch ? filenameMatch[1] : "download";

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setDialogOpen(false);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setDialogOpen(true)}>
        Download
      </Button>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Select Download Options</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={options.withReferences}
                onChange={(e) =>
                  setOptions({ ...options, withReferences: e.target.checked })
                }
              />
            }
            label="With References"
          />

          <FormControlLabel
            control={
              <Checkbox
                disabled={!options.withReferences}
                checked={options.recursive}
                onChange={(e) =>
                  setOptions({ ...options, recursive: e.target.checked })
                }
              />
            }
            label="Recursive"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDownload} variant="contained">
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Download;
