import { Stack } from "@mui/system";
import React from "react";

function ThreeColumnLayout({ children }) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      spacing={0.4}
      sx={{
        margin: 0,
        padding: {
          xs: "0 5px 0 5px",
          sm: "0 30px 0 20px",
          md: "0 70px 0 50px",
          lg: "0 150px 0 120px",
        },
      }}
    >
      {children}
    </Stack>
  );
}

export default ThreeColumnLayout;
