import { Box, List, ListItem, ListItemButton } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SimilarQuestions = ({ questionData }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let text = questionData.title + " " + questionData.body;
      await axios
        .get(`https://localhost:7127/api/questions`, {
          params: {
            pageNumber: 1,
            pageSize: 5,
            searchText: text,
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setQuestions(response.data.questions);
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.error);
          }
        });
    };
    fetchData();
  }, []);
  console.log(questions);
  if (questions === null) {
    return <div>loading ......</div>;
  }
  if (questions.length === 0) {
    return (
      <h1 style={{ margin: "35px 20px", color: "silver" }}>
        there is no questions similar
      </h1>
    );
  }

  return (
    <>
      <Box>
        <List>
          {questions.map((question) => {
            <ListItem disablePadding>
              <ListItemButton>{question.title}</ListItemButton>
            </ListItem>;
          })}
        </List>
      </Box>
    </>
  );
};

export default SimilarQuestions;
