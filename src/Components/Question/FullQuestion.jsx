import React, { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Question from "./Question";
import Answer from "./Answer";
import Styles from "../Styling.module.css";
import { Stack } from "@mui/system";
import PopUpWithButton from "../Popup/PopUpWithButton";
import FormAnswer from "./FormAnswer";

const FullQuestion = ({ questionId }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const handleOpenPopup = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const [questionData, setQuestionData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://localhost:7127/api/questions/${questionId}`)
      .then((response) => {
        setQuestionData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          var errorMessage = error.response.data.error;
          if (errorMessage === "No question with this id") {
            navigate(`/*`);
          }
        }
      });
  }, [questionId, navigate]);

  if (questionData === null) {
    return <Box flex={4}>Loading...</Box>;
  }

  return (
    <Box flex={4} p={2} sx={{ paddingTop: 5 }}>
      <Question questionData={questionData} />
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
        p={1}
      >
        <h2 className={Styles.answer}>
          {questionData.answers.length === 0 ? "No Answers Yet" : "Answers: "}
        </h2>
        <PopUpWithButton
          name={"Add Answer"}
          open={openPopup}
          handleOpen={handleOpenPopup}
          handleClose={handleClosePopup}
        >
          <FormAnswer
            questionId={questionData.id}
            handleClose={handleClosePopup}
          />
        </PopUpWithButton>
      </Stack>

      {questionData.answers.map((answer) => {
        return (
          <>
            <Divider />
            <Answer answerData={answer} />
          </>
        );
      })}
    </Box>
  );
};

export default FullQuestion;
