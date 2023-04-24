import { Avatar, CardHeader, Chip, Stack, Typography } from "@mui/material";
import React from "react";

const QuestionOverView = ({ question }) => {
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
    <Stack spacing={1}>
      <CardHeader
        sx={{ marginBottom: "-15px" }}
        avatar={
          <Avatar
            src={question.user.image?.imagePath}
            sx={{ bgcolor: "#4489f8" }}
            aria-label="recipe"
          ></Avatar>
        }
        title={question.user.username}
        subheader={getTimeSince(question.creationDate)}
      />
      <Stack padding={"0 20px"} spacing={1}>
        <Typography gutterBottom variant="h5" component="div">
          {question.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {question.body}
        </Typography>
        <Stack direction={"row"} spacing={1}>
          {question.tags.map((tag) => {
            return (
              <Chip
                label={tag.name}
                sx={{ fontSize: "10px" }}
                size={"small"}
                color={"default"}
              />
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default QuestionOverView;
