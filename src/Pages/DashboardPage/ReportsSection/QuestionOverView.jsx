import {
  Avatar,
  Box,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GetTime from "../../../Components/General/GetTime";
import StyledHtmlText from "../../../Components/General/StyledHtmlText";

const QuestionOverView = ({ questionId }) => {
  const [question, setQuestion] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://localhost:7127/api/questions/${questionId}`)
        .then((response) => {
          setQuestion(response.data);
        });
    };
    fetchData();
  }, []);
  if (question === null) {
    return <Box>loading......</Box>;
  }
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
        subheader={GetTime(question.creationDate)}
      />
      <Stack padding={"0 20px"} spacing={1}>
        <Typography gutterBottom variant="h5" component="div">
          {question.title}
        </Typography>
        <StyledHtmlText text={question.body} />
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
