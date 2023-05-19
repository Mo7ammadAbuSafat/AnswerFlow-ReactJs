import { Typography } from "@mui/material";
import React from "react";

const TableName = ({ name }) => {
  return (
    <Typography
      sx={{
        margin: "10px",
        fontSize: "15px",
        fontWeight: "600",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        color: "rgb(108, 115, 127)",
      }}
    >
      {name}
    </Typography>
  );
};

export default TableName;
