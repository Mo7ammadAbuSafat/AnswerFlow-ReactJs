import { Card, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../../Components/Question/Question";
import axios from "axios";

const UserQuestions = ({ userData }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://localhost:7127/api/questions`, {
          params: {
            pageNumber: pageNumber,
            pageSize: 10,
            userId: userData.id,
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setQuestions(response.data.questions);
          setNumOfPages(response.data.numOfPages);
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "no user with this id") {
              navigate(`/*`);
            }
          }
        });
    };
    fetchData();
  }, [userData, pageNumber]);
  if (questions === null) {
    return <div>loading ......</div>;
  }
  return (
    <Stack spacing={3} width="100%">
      {questions.map((question) => {
        return (
          <Card sx={{ minWidth: 250 }}>
            <Question
              key={question.id}
              questionData={question}
              showFullBody={false}
            />
          </Card>
        );
      })}
      <Stack marginTop={6} justifyContent={"center"} alignItems={"center"}>
        <Pagination
          count={numOfPages}
          color="primary"
          onChange={(e, page) => {
            setPageNumber(page);
            window.scroll(0, 0);
          }}
          value={pageNumber}
        />
      </Stack>
    </Stack>
  );
};

export default UserQuestions;
