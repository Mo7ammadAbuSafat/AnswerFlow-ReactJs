import { Stack } from "@mui/material";
import React from "react";

const DashboardCard = ({ children }) => {
  return (
    <Stack
      p={3}
      direction={"row"}
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

export default DashboardCard;
