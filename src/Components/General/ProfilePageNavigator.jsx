import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePageNavigator = ({ userId, username }) => {
  const navigate = useNavigate();
  return (
    <Typography
      fontSize={15}
      onClick={() => navigate(`/profile/${userId}`)}
      sx={{ "&:hover": { cursor: "pointer" } }}
    >
      {username}
    </Typography>
  );
};

export default ProfilePageNavigator;
