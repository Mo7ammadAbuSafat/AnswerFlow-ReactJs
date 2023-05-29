import { Stack } from "@mui/material";
import React from "react";
import Styles from "../Styling.module.css";

const AnswerContent = ({ answerData, showFullBody }) => {
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
    </Stack>
  );
};

export default AnswerContent;
