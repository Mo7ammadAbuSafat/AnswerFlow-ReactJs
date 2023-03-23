import { Avatar, Badge, Button, IconButton, Stack } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Feed from "../../Components/Feed/Feed";
import HiddenLeftSide from "../../Components/HiddenLeftSide";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import Navbar from "../../Components/Navbar/Navbar";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import SearchAppBar from "../../Components/SearchAppBar";
import AuthContext from "../../Components/Store/AuthProvider";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

const FeedPage = () => {
  const [state, setState] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };
  return (
    <>
      <HiddenLeftSide
        state={state}
        toggleDrawer={toggleDrawer}
        selectedLabel={"Feed"}
      />
      <Navbar displayMenu={true} toggleDrawer={toggleDrawer}>
        <Stack
          justifyContent={"space-between"}
          direction={"row"}
          width={"70%"}
          sx={{ display: { sm: "none", xs: "none", md: "flex", lg: "flex" } }}
        >
          <SearchAppBar />
          {authContext.isLoggedIn ? (
            <Stack direction={"row"} spacing={1}>
              <Avatar
                src="/Assets/avatarEx.jpg"
                sx={{ bgcolor: "green" }}
              ></Avatar>
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
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        spacing={0.4}
        sx={{
          margin: 0,
          padding: "0 150px 0 120px",
          padding: {
            xs: "0 5px 0 5px",
            sm: "0 30px 0 20px",
            md: "0 70px 0 50px",
            lg: "0 150px 0 120px",
          },
        }}
      >
        <LeftSidebar selectedLabel={"Feed"} />
        <Feed />
        <RightSidebar />
      </Stack>
    </>
  );
};

export default FeedPage;
