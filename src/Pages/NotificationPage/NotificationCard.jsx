import { Avatar, Card, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GetTime from "../../Components/General/GetTime";

const NotificationCard = ({ notificationData }) => {
  const { questionId, createdByUser, message, creationDate } = notificationData;
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
      <Stack
        p={2}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        spacing={2}
        width={"100%"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
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
          <Typography variant="body2" gutterBottom color="rgb(0 0 0 / 75%)">
            {message}
          </Typography>
        </Stack>
        <Typography fontSize={12} color="#757575">
          {GetTime(creationDate)}
        </Typography>
      </Stack>
    </Card>
  );
};

export default NotificationCard;
