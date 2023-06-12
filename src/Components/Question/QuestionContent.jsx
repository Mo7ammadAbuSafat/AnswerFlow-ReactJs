import React from "react";
import { Box, Chip, Stack } from "@mui/material";
import Styles from "../Styling.module.css";
import { useNavigate } from "react-router-dom";
import StyledHtmlText from "../General/StyledHtmlText";

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
      {!showFullBody ? (
        <p className={Styles.body1}>
          {questionData.body.replace(/<[^>]+>/g, " ")}
        </p>
      ) : (
        <Box className={Styles.body2}>
          <StyledHtmlText text={questionData.body} />
        </Box>
      )}

      {questionData.image && showFullBody && (
        <img
          alt=""
          src={questionData.image.imagePath}
          onClick={() => openLinkInNewTab(questionData.image.imagePath)}
          style={{ width: "100%", objectFit: "contain", maxHeight: "300px" }}
        />
      )}
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
