import { Avatar, Card, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationCard = ({ notificationData }) => {
  const { questionId, createdByUser, message } = notificationData;
  const navigate = useNavigate();
  return (
    <Card
      sx={{ display: "block", width: "100%", "&:hover": { cursor: "pointer" } }}
      onClick={() => {
        if (questionId != null) {
          navigate(`/questions/${questionId}`);
        }
      }}
    >
      <Stack p={2} direction={"row"} alignItems={"center"} spacing={2}>
        {createdByUser ? (
          <Avatar
            src={createdByUser.image?.imagePath}
            sx={{ bgcolor: "#4489f8" }}
            aria-label="recipe"
          ></Avatar>
        ) : (
          <Avatar sx={{ bgcolor: "#4489f8" }} aria-label="recipe">
            <NotificationsIcon />
          </Avatar>
        )}
        <Typography variant="subtitle1">{message}</Typography>
      </Stack>
    </Card>
  );
};

export default NotificationCard;
