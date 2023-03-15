import * as React from "react";
import Drawer from "@mui/material/Drawer";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import HiddenSidebarMenu from "./LeftSidebar/HiddenSidebarMenu";

export default function HiddenLeftSide({ state, toggleDrawer }) {
  return (
    <div>
      <React.Fragment>
        <Drawer open={state} onClose={toggleDrawer(false)}>
          <HiddenSidebarMenu />
        </Drawer>
      </React.Fragment>
    </div>
  );
}
