import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import PopUpModal from "../../Components/Popup/PopUpModal";
import Styles from "../../Components/Styling.module.css";
import AuthContext from "../../Components/Store/AuthProvider";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InformationSection = ({ userData }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(
    authContext.isLoggedIn &&
      userData.followerUsers.some((user) => user.id === authContext.user.id)
  );

  const handleFollowClick = async () => {
    setIsLoading(true);
    if (isFollowed) {
      await axios
        .delete(
          `https://localhost:7127/api/users/${authContext.user.id}/following-users/${userData.id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `bearer ${authContext.token}`,
            },
          }
        )
        .then((response) => setIsFollowed(false))
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.error);
          } else {
            alert("Error: ", error.message);
          }
        });
    } else {
      await axios
        .post(
          `https://localhost:7127/api/users/${authContext.user.id}/following-users/${userData.id}`,
          {},
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `bearer ${authContext.token}`,
            },
          }
        )
        .then((response) => setIsFollowed(true))
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.error);
          } else {
            alert("Error: ", error.message);
          }
        });
    }
    setIsLoading(false);
  };

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
        xs={12}
        sm={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img
          style={{ borderRadius: "50%" }}
          width={"80%"}
          alt=""
          src={
            userData.image !== null && userData.image.imagePath !== null
              ? userData.image.imagePath
              : "/Assets/defaultAvatar.png"
          }
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{ display: "flex", gap: "15px", flexDirection: "column" }}
      >
        <Stack direction={"row"} spacing={2}>
          <Typography variant="h5" color={"#303030"}>
            {userData.username}
          </Typography>
          {authContext.isLoggedIn && authContext.user.id === userData.id ? (
            <IconButton
              onClick={() => navigate("/users/account")}
              aria-label="settings"
            >
              <EditIcon sx={{ color: "#555" }} />
            </IconButton>
          ) : (
            <Button
              sx={{
                textTransform: "none",
              }}
              variant={isFollowed ? "outlined" : "contained"}
              size="small"
              bgcolor={"#4489f8"}
              disabled={!authContext.isLoggedIn}
              onClick={handleFollowClick}
            >
              {isLoading ? (
                <CircularProgress
                  color="inherit"
                  size={16}
                  sx={{ marginRight: "5px" }}
                />
              ) : isFollowed ? (
                "Unfollow"
              ) : (
                "Follow"
              )}
            </Button>
          )}
        </Stack>
        {(userData.type === 2 || userData.type === 3) && (
          <Box
            justifyContent={"center"}
            color="white"
            width="90px"
            p="5px"
            display="flex"
            borderRadius="5px"
            backgroundColor={"#546564"}
          >
            {userData.type === 2 ? "Expert" : "Admin"}
          </Box>
        )}
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
