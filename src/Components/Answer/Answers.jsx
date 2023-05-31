import React, { useEffect, useState } from "react";
import Answer from "./Answer";
import { Divider } from "@mui/material";
import axios from "axios";

const Answers = ({ questionId, lastEditDateForQuestion = null }) => {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    axios
      .get(`https://localhost:7127/api/questions/${questionId}/answers`)
      .then((response) => {
        setAnswers(response.data);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        }
      });
  }, [questionId]);
  return answers.map((answer) => {
    return (
      <>
        <Divider />
        <Answer
          answerData={answer}
          lastEditDateForQuestion={lastEditDateForQuestion}
        />
      </>
    );
  });
};

export default Answers;
