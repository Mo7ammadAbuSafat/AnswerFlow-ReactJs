import { Box } from "@mui/material";
import React from "react";
import SuggestTags from "./SuggestTags";
import SuggestUsers from "./SuggestUsers";

const RightSidebar = () => {
  return (
    <Box
      flex={1.5}
      sx={{
        display: { xs: "none", sm: "none", md: "none", lg: "block" },
      }}
    >
      <SuggestTags />
      <SuggestUsers />
    </Box>
  );
};

export default RightSidebar;
