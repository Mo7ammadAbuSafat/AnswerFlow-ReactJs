import { Box, Card, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PopUpWithButton from "../../Components/Popup/PopUpWithButton";
import FormStepperToPostQuestion from "../../Components/Question/Forms/FormStepperToPostQuestion";
import Question from "../../Components/Question/Question";
import axios from "axios";
import Filter from "./Filter";

const Questions = () => {
  const [trigger, setTrigger] = useState(false);
  const handleTrigger = () => setTrigger(!trigger);
  const [apiParams, setApiParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    sortBy: null,
    dateTime: null,
    questionStatus: null,
    tagNames: null,
  });

  const [numOfPages, setNumOfPages] = useState(1);

  const [openPopup, setOpenPopup] = useState(false);
  const handleOpenPopup = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
          setData(response.data.questions);
          setNumOfPages(response.data.numOfPages);
        });
    };
    fetchData();
  }, [apiParams, trigger]);

  if (data === null) {
    return <Box flex={4}>Loading...</Box>;
  }

  return (
    <Box flex={4} p={2}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        height={100}
      >
        <Grid item xs={2.5}>
          <Typography variant="h3" color="text.secondary" sx={{ margin: 0 }}>
            Questions
          </Typography>
        </Grid>
        <Grid item xs={2.5}>
          <PopUpWithButton
            name={"Post Question"}
            open={openPopup}
            handleOpen={handleOpenPopup}
            handleClose={handleClosePopup}
          >
            <FormStepperToPostQuestion
              onClose={handleClosePopup}
              handleTrigger={handleTrigger}
            />
          </PopUpWithButton>
        </Grid>
      </Grid>
      <Filter apiParams={apiParams} setApiParams={setApiParams} />
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
            setApiParams({
              ...apiParams,
              pageNumber: page,
            });
            window.scroll(0, 0);
          }}
          value={apiParams.pageNumber}
        />
      </Stack>
    </Box>
  );
};

export default Questions;
