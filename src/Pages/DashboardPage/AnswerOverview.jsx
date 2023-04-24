import { Avatar, CardHeader, Stack, Typography } from "@mui/material";
import React from "react";

const AnswerOverview = ({ answer }) => {
  const getTimeSince = (date) => {
    date = new Date(date);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000; // difference in seconds

    if (diff < 60) {
      return `${Math.floor(diff)} seconds ago`;
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
    } else if (diff < 604800) {
      const days = Math.floor(diff / 86400);
      return `${days} ${days > 1 ? "days" : "day"} ago`;
    } else if (diff < 2628000) {
      const weeks = Math.floor(diff / 604800);
      return `${weeks} ${weeks > 1 ? "weeks" : "week"} ago`;
    } else if (diff < 31536000) {
      const months = Math.floor(diff / 2628000);
      return `${months} ${months > 1 ? "months" : "month"} ago`;
    } else {
      const years = Math.floor(diff / 31536000);
      return `${years} ${years > 1 ? "years" : "year"} ago`;
    }
  };
  return (
    <Stack spacing={1} p={1}>
      <CardHeader
        sx={{ paddingTop: 0 }}
        avatar={
          <Avatar
            src={answer.user.image?.imagePath}
            sx={{ bgcolor: "#4489f8" }}
            aria-label="recipe"
          ></Avatar>
        }
        title={answer.user.username}
        subheader={getTimeSince(answer.creationDate)}
      />
      <Stack spacing={1.5} width={"100%"} sx={{ padding: "0 30px 0 70px" }}>
        <Typography
          sx={{
            minHeight: "90px",
            color: "#383838",
            lineHeight: "25px",
            backgroundColor: "#f1f1f1",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          {answer.body}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AnswerOverview;
