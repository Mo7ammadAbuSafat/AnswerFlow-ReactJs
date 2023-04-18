import * as React from "react";
import Drawer from "@mui/material/Drawer";
import LeftSidebarMenu from "./LeftSidebarMenu";
import { Stack } from "@mui/material";

const HiddenLeftSide = ({ state, toggleDrawer, selectedLabel }) => {
  return (
    <Drawer open={state} onClose={toggleDrawer(false)}>
      <Stack p={3}>
        <LeftSidebarMenu selectedLabel={selectedLabel} />
      </Stack>
    </Drawer>
  );
};
export default HiddenLeftSide;
