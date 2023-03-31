import { Box, Card, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PopUpWithButton from "./Popup/PopUpWithButton";
import FormStepperToPostQuestion from "./Question/FormStepperToPostQuestion";
import Question from "./Question/Question";

const Feed = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const handleOpenPopup = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7127/api/questions").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Box flex={4} p={2}>
      <Stack direction={"row"} justifyContent={"space-between"} m={0}>
        <Typography
          variant="h3"
          color="text.secondary"
          sx={{ margin: "20px 0 30px 0" }}
        >
          Feed
        </Typography>
        <PopUpWithButton
          name={"Post Question"}
          open={openPopup}
          handleOpen={handleOpenPopup}
          handleClose={handleClosePopup}
        >
          <FormStepperToPostQuestion onClose={handleClosePopup} />
        </PopUpWithButton>
      </Stack>

      <Stack spacing={3}>
        {data.map((question) => {
          return (
            <Card sx={{ maxWidth: 800, minWidth: 250 }}>
              <Question
                key={question.id}
                questionData={question}
                showFullBody={false}
              />
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Feed;
