import {
  Box,
  Card,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Question from "../../Components/Question/Question";
import { useState } from "react";
import axios from "axios";
import ButtonWithLoading from "../../Components/Buttons/ButtonWithLoading";

const SearchContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiParams, setApiParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    searchText: "",
  });

  const handleSearchTextChange = (e) => {
    setApiParams({
      ...apiParams,
      searchText: e.target.value,
    });
  };
  const [numOfPages, setNumOfPages] = useState(1);
  const [questions, setQuestions] = useState(null);

  const handleSearchClick = () => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get("https://localhost:7127/api/questions", {
          params: {
            ...apiParams,
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setQuestions(response.data.questions);
          setNumOfPages(response.data.numOfPages);
        });
      setIsLoading(false);
    };
    fetchData();
  };

  return (
    <Box flex={4} p={2}>
      <Box
        marginTop={"60px"}
        display={"flex"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TextField
          value={apiParams.searchText}
          onChange={handleSearchTextChange}
          placeholder="type text to search"
          sx={{ width: "60%", marginRight: "15px" }}
        />
        <ButtonWithLoading
          label={"Search"}
          onClick={handleSearchClick}
          isLoading={isLoading}
        />
      </Box>
      {questions !== null && questions.length === 0 && (
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{ textAlign: "center", marginTop: "50px" }}
        >
          No Result
        </Typography>
      )}
      {questions !== null && questions.length !== 0 && (
        <>
          <Stack spacing={3} marginTop={"30px"}>
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
          </Stack>
          <Stack marginTop={6} justifyContent={"center"} alignItems={"center"}>
            <Pagination
              count={numOfPages}
              color="primary"
              onChange={(e, page) => {
                setApiParams({
                  ...apiParams,
                  pageNumber: page,
                });
                window.scroll(0, 0);
              }}
              value={apiParams.pageNumber}
            />
          </Stack>
        </>
      )}
    </Box>
  );
};

export default SearchContent;
