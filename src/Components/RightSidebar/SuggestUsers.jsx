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
            src="https://scontent.fjrs25-1.fna.fbcdn.net/v/t1.6435-9/190287492_2197637973701709_3691271868296479587_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=P3mLqtuUx0MAX92TKk-&_nc_ht=scontent.fjrs25-1.fna&oh=00_AfBaW2Ky9qssyiS7BHzcJ5bXmj0hQD22tyO2V8HKLuuilQ&oe=644063A0"
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
