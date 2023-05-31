import { Button, CircularProgress } from "@mui/material";
import React from "react";

const ButtonWithLoading = ({ isLoading, onClick, label }) => {
  return (
    <Button
      sx={{
        height: "42px",
        textTransform: "none",
        background: "#4489f8",
        margin: "10px 0",
      }}
      variant="contained"
      size="large"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <CircularProgress
          color="inherit"
          size={16}
          sx={{ marginRight: "5px" }}
        />
      ) : (
        label
      )}
    </Button>
  );
};

export default ButtonWithLoading;
