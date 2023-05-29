import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import ProfilePageNavigator from "../General/ProfilePageNavigator";

const VoteUsers = ({ votesData }) => {
  return votesData.map((vote) => {
    return (
      <>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              src={vote.user.image?.imagePath}
              sx={{ bgcolor: "#4489f8" }}
            ></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <ProfilePageNavigator
                userId={vote.user.id}
                username={vote.user.username}
              />
            }
          />
          <Box m={2}>
            {vote.type === 1 ? (
              <BsFillCaretUpFill
                color="green"
                size={"20px"}
                sx={{ marginLeft: "2px" }}
              />
            ) : (
              <BsFillCaretDownFill color="red" size={"20px"} />
            )}
          </Box>
        </ListItem>
        <Divider />
      </>
    );
  });
};

export default VoteUsers;
