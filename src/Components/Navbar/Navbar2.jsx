import { Avatar, Button, Fade, Menu, MenuItem } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchAppBar from "../SearchAppBar";
import AuthContext from "../Store/AuthProvider";
import Navbar from "./Navbar";
import HiddenLeftSide from "../LeftSidebar/HiddenLeftSide";

function Navbar2({ selectedLabel }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  // this for menu:
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // end

  return (
    <>
      <HiddenLeftSide
        state={state}
        toggleDrawer={toggleDrawer}
        selectedLabel={selectedLabel}
      />
      <Navbar displayMenu={true} toggleDrawer={toggleDrawer}>
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
          width={"70%"}
          sx={{ display: { sm: "none", xs: "none", md: "flex", lg: "flex" } }}
        >
          <SearchAppBar />
          {authContext.isLoggedIn ? (
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <p style={{ color: "white" }}>{authContext.user.username}</p>
              <Avatar
                onClick={handleClick}
                src={authContext.user.image?.imagePath}
                sx={{ bgcolor: "#4489f8", border: "3px solid white" }}
              ></Avatar>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Stack>
          ) : (
            <Button
              sx={{
                textTransform: "none",
                height: "40px",
                color: "white",
                borderColor: "white",
                marginLeft: "10px",
              }}
              variant="outlined"
              size="medium"
              onClick={() => navigate("/signInPage")}
            >
              Sign In
            </Button>
          )}
        </Stack>
      </Navbar>
    </>
  );
}

export default Navbar2;
