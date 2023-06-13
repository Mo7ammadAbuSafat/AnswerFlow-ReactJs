import { Card, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import GetTime from "../General/GetTime";
import StyledHtmlText from "../General/StyledHtmlText";

const QuestionHistory = ({ questionHistory }) => {
  return (
    <Stack p={1.5} spacing={1.5}>
      {questionHistory.map((item) => {
        return (
          <Card>
            <Stack p={2} spacing={1}>
              <Typography variant="body2" color="text.secondary">
                {GetTime(item.editDate)}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <StyledHtmlText text={item.body} />
              <Stack direction={"row"} spacing={1}>
                {item.tagNames.split(",").map((tag) => {
                  return (
                    <Chip
                      label={tag}
                      sx={{ fontSize: "10px" }}
                      size={"small"}
                      color={"default"}
                    />
                  );
                })}
              </Stack>
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
};

export default QuestionHistory;
