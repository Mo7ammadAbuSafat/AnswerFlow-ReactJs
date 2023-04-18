import { Box } from "@mui/material";
import React from "react";
import LeftSidebarMenu from "./LeftSidebarMenu";

const LeftSidebar = ({ selectedLabel }) => {
  return (
    <Box
      flex={1.2}
      p={2}
      position={"sticky"}
      top={80}
      sx={{
        marginTop: "12px",
        height: "calc(100vh - 80px)",
        display: { xs: "none", sm: "none", md: "block" },
      }}
    >
      <LeftSidebarMenu selectedLabel={selectedLabel} />
    </Box>
  );
};

export default LeftSidebar;
