import { Stack } from "@mui/material";
import React from "react";

const TableCard = ({ children }) => {
  return (
    <Stack
      p={1.5}
      direction={"column"}
      justifyContent={"space-between"}
      sx={{
        borderRadius: "30px",
        boxShadow: "0px 0px 20px 0px silver",
      }}
    >
      {children}
    </Stack>
  );
};

export default TableCard;
