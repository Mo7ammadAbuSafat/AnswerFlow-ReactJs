import { Box } from "@mui/material";
import React from "react";

const RightSidebar = ({ children }) => {
  return (
    <Box
      flex={1.5}
      sx={{
        display: { xs: "none", sm: "none", md: "none", lg: "block" },
      }}
    >
      {children}
    </Box>
  );
};

export default RightSidebar;
