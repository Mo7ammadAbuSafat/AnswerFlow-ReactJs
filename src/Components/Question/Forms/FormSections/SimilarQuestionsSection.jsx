import { Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SimilarQuestionCard from "./SimilarQuestionCard";

const SimilarQuestionsSection = ({ inputs }) => {
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://localhost:7127/api/questions", {
          params: {
            pageNumber: 1,
            pageSize: 10,
            searchText:
              inputs.title + " " + inputs.body.replace(/<[^>]+>/g, " "),
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setQuestions(response.data.questions);
        });
    };
    fetchData();
  }, []);
  if (questions === null) {
    return (
      <h2 style={{ margin: "35px 20px", color: "silver" }}>Loading ....</h2>
    );
  } else if (questions.length === 0) {
    return (
      <h1 style={{ margin: "35px 20px", color: "silver" }}>
        there is no questions similar
      </h1>
    );
  }
  return (
    <Stack
      spacing={2}
      sx={{ height: "90%", overflowY: "auto", padding: 3, marginTop: "15px" }}
    >
      {questions.map((question) => {
        return <SimilarQuestionCard questionData={question} />;
      })}
    </Stack>
  );
};

export default SimilarQuestionsSection;
