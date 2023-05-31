import React, { useEffect, useState } from "react";
import { Box, Divider, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Question from "./Question";
import Styles from "../Styling.module.css";
import PopUpWithButton from "../Popup/PopUpWithButton";
import FormToAddAnswer from "../Answer/FormToAddAnswer";
import Answers from "../Answer/Answers";

const FullQuestion = ({ questionId }) => {
  const [trigger, setTrigger] = useState(false);
  const handleTrigger = () => setTrigger(!trigger);
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
  }, [questionId, navigate, trigger]);

  if (questionData === null) {
    return <Box flex={4}>Loading...</Box>;
  }

  return (
    <Box flex={4} p={2} sx={{ paddingTop: 5 }}>
      <Question questionData={questionData} />
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        p={1}
      >
        <Grid item xs={4}>
          <h2 className={Styles.answer}>
            {questionData.answersCount === 0 ? "No Answers Yet" : "Answers: "}
          </h2>
        </Grid>
        <Grid item xs={2}>
          <PopUpWithButton
            name={"Add Answer"}
            open={openPopup}
            handleOpen={handleOpenPopup}
            handleClose={handleClosePopup}
          >
            <FormToAddAnswer
              questionId={questionData.id}
              handleClose={handleClosePopup}
              handleTrigger={handleTrigger}
            />
          </PopUpWithButton>
        </Grid>
      </Grid>
      <Answers
        questionId={questionData.id}
        lastEditDateForQuestion={questionData.lastEditDate}
      />
    </Box>
  );
};

export default FullQuestion;
