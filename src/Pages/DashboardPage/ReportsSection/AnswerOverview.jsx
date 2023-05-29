import { Avatar, Box, CardHeader, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GetTime from "../../../Components/General/GetTime";
import axios from "axios";

const AnswerOverview = ({ questionId, answerId }) => {
  const [answer, setAnswer] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://localhost:7127/api/questions/${questionId}/answers/${answerId}`
        )
        .then((response) => {
          setAnswer(response.data);
        });
    };
    fetchData();
  }, []);
  if (answer === null) {
    return <Box>loading......</Box>;
  }
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
        subheader={GetTime(answer.creationDate)}
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
