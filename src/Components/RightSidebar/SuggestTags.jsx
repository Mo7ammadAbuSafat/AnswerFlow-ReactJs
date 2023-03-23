import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

const SuggestTags = () => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        margin: "10px 0 0 0",
      }}
    >
      <Typography margin={2} sx={{ fontSize: "20px" }}>
        Suggest Tags
      </Typography>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#4489f8" }}>J</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Java" secondary="160 Question" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#4489f8" }}>B</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Backend" secondary="100 Question" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#4489f8" }}>D</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Database" secondary="60 Question" />
      </ListItem>
    </List>
  );
};

export default SuggestTags;
