import { Alert, Backdrop, CircularProgress, Paper } from "@mui/material";
import React from "react";
import MetadataDisplay from "./MetadataDisplay";
import type Resource from "@models/Resource";

const Disclamer = (): React.JSX.Element => (
  <Alert severity="info">
    The data contained in this resource is synthetic, meaning it is realistic
    but not derived from actual patients or healthcare events. <br />
    The synthetic data is explicitly designed to contain no PII or PHI. Any
    resemblance to real entities is purely coincidental. <br />
    Resources with an IHI, HPI-I, or HPI-O are provided by Services Australia
    for test purposes and are present in the HI Vendor Test Environment.
    Medicare Card Numbers, DVA numbers, and Ahpra Registration Numbers are also
    provided by Services Australia for test purposes. <br />
    Australian Business Numbers (ABNs) present in the data for fictitious
    organizations are not valid ABNs and will not pass validity checks.
  </Alert>
);

const ResourceDetail = ({
  reference,
}: {
  reference: string | undefined;
}): React.JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [resource, setResource] = React.useState<Resource | null>(null);
  React.useEffect(() => {
    const fetchResource = async () => {
      setLoading(true);
      try {
        if (reference) {
          const response = await fetch("/api/resource/?reference=" + encodeURI(reference));
          const data = await response.json();
          setResource(data);
        } else {
          setResource(null);
        }
      } catch (error) {
        console.error("Failed to fetch resource", error);
        setResource(null);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [reference]);
  return (
    <div>
      {resource && (
        <>
          <MetadataDisplay metadata={resource} />
          {resource.tags?.includes("Service Australia") && <Disclamer />}
          <Backdrop
            open={loading}
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {!loading && resource && (
            <Paper>
              <pre>{JSON.stringify(resource.json, null, 2)}</pre>
            </Paper>
          )}
        </>
      )}
    </div>
  );
};

export default ResourceDetail;
