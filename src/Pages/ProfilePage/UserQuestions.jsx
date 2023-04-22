import { Card, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../../Components/Question/Question";
import axios from "axios";

const UserQuestions = ({ userData }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7127/api/questions/users/${userData.id}`)
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          var errorMessage = error.response.data.error;
          if (errorMessage === "No user with this id") {
            navigate(`/*`);
          }
        }
      });
  }, [userData, navigate]);
  if (questions === null) {
    return <div>loading ......</div>;
  }
  return (
    <Stack spacing={3}>
      {questions.map((question) => {
        return (
          <Card sx={{ minWidth: 250, paddingRight: 3 }}>
            <Question
              key={question.id}
              questionData={question}
              showFullBody={false}
            />
          </Card>
        );
      })}
    </Stack>
  );
};

export default UserQuestions;
