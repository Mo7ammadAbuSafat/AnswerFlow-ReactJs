import React from "react";
import { Chip, Stack } from "@mui/material";
import Styles from "../Styling.module.css";
import { useNavigate } from "react-router-dom";

const QuestionContent = ({ questionData, showFullBody = true }) => {
  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };
  const navigate = useNavigate();
  return (
    <Stack
      spacing={1.5}
      maxWidth={600}
      width={"100%"}
      sx={{ padding: "0 20px 0 0" }}
    >
      <p
        className={showFullBody ? Styles.title2 : Styles.title1}
        onClick={() => {
          if (!showFullBody) navigate(`/questions/${questionData.id}`);
        }}
      >
        {questionData.title}
      </p>
      <p className={showFullBody ? Styles.body2 : Styles.body1}>
        {questionData.body}
      </p>
      <Stack direction={"row"} spacing={1} marginTop={10}>
        {questionData.tags.map((tag) => {
          return (
            <Chip
              label={tag.name}
              sx={{ fontSize: "10px" }}
              size={"small"}
              color={"default"}
              onClick={
                tag.sourceLink !== null
                  ? () => openLinkInNewTab(tag.sourceLink)
                  : false
              }
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default QuestionContent;