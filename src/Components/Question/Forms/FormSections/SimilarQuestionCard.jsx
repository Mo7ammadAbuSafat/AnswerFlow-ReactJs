import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const SimilarQuestionCard = ({ questionData }) => {
  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };
  return (
    <Box
      onClick={() => {
        openLinkInNewTab(`/questions/${questionData.id}`);
      }}
      sx={{ "&:hover": { cursor: "pointer" } }}
    >
      <Card sx={{ padding: 2 }}>
        <Typography variant="subtitle2">{questionData.title}</Typography>
      </Card>
    </Box>
  );
};

export default SimilarQuestionCard;
