import React from "react";
import ResourceDetail from "@components/ResourceDetail";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Paper } from "@mui/material";

const ResourceDetailPage = (): React.JSX.Element => {
  const { reference } = useParams();
  const navigate = useNavigate();
  return (
    <Paper>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      <ResourceDetail reference={reference} />
    </Paper>
  );
};

export default ResourceDetailPage;
