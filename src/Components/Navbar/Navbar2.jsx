import { Avatar, Box, Button, Fade, Menu, MenuItem } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchAppBar from "./SearchAppBar";
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
  const [anchorEl, setAnchorEl] = useState(null);
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
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <SearchAppBar />
        </Box>
        {authContext.isLoggedIn ? (
          <>
            <Stack
              sx={{ "&:hover": { cursor: "pointer" } }}
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              onClick={handleClick}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  color: "white",
                }}
              >
                {authContext.user.username}
              </Box>
              <Avatar
                src={authContext.user.image?.imagePath}
                sx={{ bgcolor: "#4489f8", border: "3px solid white" }}
              ></Avatar>
            </Stack>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate(`/profile/${authContext.user.id}`);
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/users/account");
                  handleClose();
                }}
              >
                My account
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/sign-in");
                  authContext.logout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
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
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
        )}
      </Navbar>
    </>
  );
}

export default Navbar2;
