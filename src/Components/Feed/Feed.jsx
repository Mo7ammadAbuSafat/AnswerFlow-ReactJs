import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import PopUpModal from "../PostQuestionForm/QuestionForm";
import QuestionOverview from "../QuestionOverview";
import AuthContext from "../Store/AuthProvider";

const Feed = () => {
  const authContext = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const questions = [
    {
      id: 5,
      user: {
        userId: 1,
        imageUrl:
          "https://scontent.fjrs25-1.fna.fbcdn.net/v/t39.30808-6/305234720_2576862019112634_2092662090129497662_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=BxOEQ0IILfIAX9bJUAP&_nc_ht=scontent.fjrs25-1.fna&oh=00_AfCEaMgauM7597voNI_1k2ix0d-DK7g8pPp3ENs98eId-w&oe=641E4986",
        name: "mohammad abusafat",
      },
      creationDate: "September 14, 2022",
      title:
        "How to disable secure file priv as a read only variable on MySQL on mac?",
      body: "How to disable secure file priv as a read only variable on MySQL on mac?",
      tags: ["Java", "Python", "Database"],
      noOfAnswers: 6,
      confirmed: false,
      votesSum: -1,
    },
    {
      id: 5,
      user: {
        userId: 1,
        imageUrl:
          "https://scontent.fjrs25-1.fna.fbcdn.net/v/t39.30808-6/265505624_2359665567498948_6846169401398536435_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=sKwOD1XJ2nsAX-3Xpyw&_nc_ht=scontent.fjrs25-1.fna&oh=00_AfCFhcS5BYsqQgkDhYPeyS-nglz09F_lDgTO8-vNZ-vuuQ&oe=641DA5F6",
        name: "mohammad abusafat",
      },
      creationDate: "March 9, 2022",
      title: "select properties in nested JSON in MariaDB",
      body: " How can I select all bookmarkLink Where bookmarkName = bookmark1",
      tags: ["Java", "Python", "Database"],
      noOfAnswers: 20,
      confirmed: true,
      votesSum: 29,
    },
  ];
  return (
    <Box flex={4} p={2}>
      <Stack direction={"row"} justifyContent={"space-between"} m={0}>
        <Typography
          variant="h3"
          color="text.secondary"
          sx={{ margin: "20px 0 30px 0" }}
        >
          Feed
        </Typography>
        <Button
          sx={{
            margin: "20px 0 30px 0",
            height: "45px",
            background: "#4489f8",
            textTransform: "none",
          }}
          onClick={() => handleOpen()}
          variant="contained"
          size="large"
          disabled={!authContext.isLoggedIn}
        >
          {"Post Question"}
        </Button>
      </Stack>

      <Stack spacing={3}>
        {questions.map((question) => {
          return <QuestionOverview questionData={question} />;
        })}
      </Stack>
      <PopUpModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Feed;
