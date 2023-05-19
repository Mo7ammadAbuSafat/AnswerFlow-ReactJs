import { Box, Card, Pagination, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Question from "../../Components/Question/Question";
import AuthContext from "../../Components/Store/AuthProvider";

const SavedQuestions = () => {
  const authContext = useContext(AuthContext);

  // for pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  // end

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://localhost:7127/api/users/${authContext.user.id}/saved-questions`,
          {
            params: {
              pageNumber: pageNumber,
              pageSize: 10,
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `bearer ${authContext.token}`,
            },
          }
        )
        .then((response) => {
          setData(response.data.questions);
          setNumOfPages(response.data.numOfPages);
        });
    };
    fetchData();
  }, [pageNumber, authContext]);

  if (data === null) {
    return <Box flex={4}>Loading...</Box>;
  }

  return (
    <Box flex={4} p={2}>
      <Typography
        variant="h4"
        color="text.secondary"
        sx={{ margin: "20px 0 30px 0" }}
      >
        Saved Questions
      </Typography>
      <Stack spacing={3}>
        {data.map((question) => {
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
            setPageNumber(page);
            window.scroll(0, 0);
          }}
          value={pageNumber}
        />
      </Stack>
    </Box>
  );
};

export default SavedQuestions;
