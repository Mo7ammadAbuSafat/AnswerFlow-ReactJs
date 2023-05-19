import React from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";
import QuestionBottom from "./QuestionBottom";
import QuestionVote from "./QuestionVote";
import QuestionContent from "./QuestionContent";
import GetTime from "../General/GetTime";
import QuestionOptions from "./QuestionOptions";
import ProfilePageNavigator from "../General/ProfilePageNavigator";

const Question = ({ questionData, showFullBody = true }) => {
  return (
    <>
      <CardHeader
        avatar={
          <Avatar
            src={questionData.user.image?.imagePath}
            sx={{ bgcolor: "#4489f8" }}
            aria-label="recipe"
          ></Avatar>
        }
        action={<QuestionOptions questionData={questionData} />}
        title={
          <ProfilePageNavigator
            userId={questionData.user.id}
            username={questionData.user.username}
          />
        }
        subheader={
          questionData.lastEditDate === null
            ? GetTime(questionData.creationDate)
            : GetTime(questionData.creationDate) +
              ` (edited in ${GetTime(questionData.lastEditDate)})`
        }
      />
      <CardContent sx={{ padding: "0" }}>
        <Stack direction={"row"} justifyContent={"left"}>
          <QuestionVote questionData={questionData} />
          <QuestionContent
            questionData={questionData}
            showFullBody={showFullBody}
          />
        </Stack>
      </CardContent>
      <QuestionBottom questionData={questionData} />
    </>
  );
};

export default Question;
