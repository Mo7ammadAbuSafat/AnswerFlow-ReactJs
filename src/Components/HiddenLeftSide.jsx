import * as React from "react";
import Drawer from "@mui/material/Drawer";
import HiddenSidebarMenu from "./LeftSidebar/HiddenSidebarMenu";

export default function HiddenLeftSide({ state, toggleDrawer, selectedLabel }) {
  return (
    <div>
      <React.Fragment>
        <Drawer open={state} onClose={toggleDrawer(false)}>
          <HiddenSidebarMenu selectedLabel={selectedLabel} />
        </Drawer>
      </React.Fragment>
    </div>
  );
}
