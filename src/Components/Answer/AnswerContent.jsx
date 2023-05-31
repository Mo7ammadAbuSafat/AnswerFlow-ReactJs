import { Stack, Typography } from "@mui/material";
import React from "react";
import Styles from "../Styling.module.css";

const AnswerContent = ({
  answerData,
  showFullBody,
  lastEditDateForQuestion,
}) => {
  return (
    <Stack
      spacing={1.5}
      maxWidth={600}
      width={"100%"}
      sx={{ padding: "0 5px" }}
    >
      <p
        className={showFullBody ? Styles.body2 : Styles.body1}
        style={{ minHeight: "90px" }}
      >
        {answerData.body}
      </p>
      {lastEditDateForQuestion !== null &&
        lastEditDateForQuestion > answerData.creationDate && (
          <Typography variant="caption" display="block" sx={{ margin: "0" }}>
            *answered before editing question
          </Typography>
        )}
    </Stack>
  );
};

export default AnswerContent;
