import { Avatar, Box, Stack } from "@mui/material";
import React, { useState } from "react";
import Feed from "../../Components/Feed/Feed";
import HiddenLeftSide from "../../Components/HiddenLeftSide";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import Navbar from "../../Components/Navbar/Navbar";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import SearchAppBar from "../../Components/SearchAppBar";

const FeedPage = () => {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };
  return (
    <>
      <HiddenLeftSide state={state} toggleDrawer={toggleDrawer} />
      <Navbar displayMenu={true} toggleDrawer={toggleDrawer}>
        <Stack
          justifyContent={"space-between"}
          direction={"row"}
          width={"70%"}
          sx={{ display: { sm: "none", xs: "none", md: "flex", lg: "flex" } }}
        >
          <SearchAppBar />
          <Avatar src="/Assets/avatarEx.jpg" sx={{ bgcolor: "green" }}></Avatar>
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
        <LeftSidebar />
        <Feed />
        <RightSidebar />
      </Stack>
    </>
  );
};

export default FeedPage;
