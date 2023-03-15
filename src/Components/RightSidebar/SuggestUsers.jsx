import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

const SuggestUsers = () => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Typography margin={2} sx={{ fontSize: "20px" }}>
        Suggest Users
      </Typography>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            src="/Assets/avatarEx.jpg"
            sx={{ bgcolor: "#4489f8" }}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText primary="Khaled Abubaker" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#4489f8" }}></Avatar>
        </ListItemAvatar>
        <ListItemText primary="Waleed Mahmoud" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar
            src="/Assets/avatarEx.jpg"
            sx={{ bgcolor: "#4489f8" }}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText primary="Mamoun Abubaker" />
      </ListItem>
    </List>
  );
};

export default SuggestUsers;
