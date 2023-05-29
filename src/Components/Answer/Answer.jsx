import { Avatar, Card, CardHeader } from "@mui/material";
import React from "react";
import CardContent from "@mui/material/CardContent";
import { Stack } from "@mui/material";
import GetTime from "../General/GetTime";
import ProfilePageNavigator from "../General/ProfilePageNavigator";
import AnswerVote from "./AnswerVote";
import AnswerContent from "./AnswerContent";
import AnswerOptions from "./AnswerOptions";

const Answer = ({ answerData, showFullBody = true }) => {
  return (
    <Card sx={{ margin: "25px 0" }}>
      <CardHeader
        sx={{ marginBottom: "-15px" }}
        avatar={
          <Avatar
            src={answerData.user.image?.imagePath}
            sx={{ bgcolor: "#4489f8" }}
            aria-label="recipe"
          ></Avatar>
        }
        action={<AnswerOptions answerData={answerData} />}
        title={
          <ProfilePageNavigator
            userId={answerData.user.id}
            username={answerData.user.username}
          />
        }
        subheader={GetTime(answerData.creationDate)}
      />

      <CardContent sx={{ padding: 0, marginTop: 1 }}>
        <Stack direction={"row"} justifyContent={"left"}>
          <AnswerVote answerData={answerData} />
          <AnswerContent answerData={answerData} showFullBody={showFullBody} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Answer;
