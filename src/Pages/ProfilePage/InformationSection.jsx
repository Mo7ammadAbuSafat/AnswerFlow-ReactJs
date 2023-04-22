import {
  Avatar,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PopUpModal from "../../Components/Popup/PopUpModal";
import Styles from "../../Components/Styling.module.css";

const InformationSection = ({ userData }) => {
  const followingUsers = userData.followingUsers.map((user) => {
    return (
      <>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              src={user.image?.imagePath}
              sx={{ bgcolor: "#4489f8" }}
            ></Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.username} />
        </ListItem>
        <Divider />
      </>
    );
  });
  const [openFollowingUsersPopup, setOpenFollowingUsersPopup] = useState(false);
  const handleOpenFollowingUsersPopup = () => {
    setOpenFollowingUsersPopup(true);
  };
  const handleCloseOpenFollowingUsersPopup = () => {
    setOpenFollowingUsersPopup(false);
  };

  const followerUsers = userData.followerUsers.map((user) => {
    return (
      <>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              src={user.image?.imagePath}
              sx={{ bgcolor: "#4489f8" }}
            ></Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.username} />
        </ListItem>
        <Divider />
      </>
    );
  });
  const [openFollowerUsersPopup, setOpenFollowerUsersPopup] = useState(false);
  const handleOpenFollowerUsersPopup = () => {
    setOpenFollowerUsersPopup(true);
  };
  const handleCloseOpenFollowerUsersPopup = () => {
    setOpenFollowerUsersPopup(false);
  };
  return (
    <Grid container spacing={2} width={"100%"} marginTop={0.5}>
      <Grid
        item
        xs={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img
          style={{ borderRadius: "50%" }}
          width={"80%"}
          alt=""
          src={userData.image?.imagePath}
        />
      </Grid>
      <Grid
        item
        xs={8}
        sx={{ display: "flex", gap: "15px", flexDirection: "column" }}
      >
        <Typography variant="h5" gutterBottom color={"#303030"}>
          {userData.username}
        </Typography>
        <Stack direction={"row"} spacing={3}>
          <Typography
            className={Styles.mouseHaver}
            variant="body"
            gutterBottom
            color={"#303030"}
            onClick={handleOpenFollowingUsersPopup}
          >
            {userData.followingUsers.length} Following
          </Typography>
          <PopUpModal
            name={"Following Users"}
            open={openFollowingUsersPopup}
            fullWidth={false}
            handleClose={handleCloseOpenFollowingUsersPopup}
          >
            {followingUsers}
          </PopUpModal>
          <Typography
            className={Styles.mouseHaver}
            variant="body"
            gutterBottom
            color={"#303030"}
            onClick={handleOpenFollowerUsersPopup}
          >
            {userData.followerUsers.length} Followers
          </Typography>
          <PopUpModal
            name={"Follower Users"}
            open={openFollowerUsersPopup}
            fullWidth={false}
            handleClose={handleCloseOpenFollowerUsersPopup}
          >
            {followerUsers}
          </PopUpModal>
        </Stack>
        <Typography
          variant="body"
          gutterBottom
          color={"#303030"}
          lineHeight={1.4}
        >
          AbuSafat <br />
          Ya'bad ❤️
          <br />
          9. March .
          <br /> "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ
          حَسَنَةً وَقِنَا عَذَابَ النَّارِ".
          <br /> PTUK CSE . 💚
        </Typography>
      </Grid>
    </Grid>
  );
};

export default InformationSection;
