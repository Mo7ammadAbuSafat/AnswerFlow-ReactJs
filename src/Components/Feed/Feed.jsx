import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PopUpModal from "../PostQuestionForm/QuestionForm";
import QuestionOverview from "../QuestionOverview";

const Feed = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
        <Button
          sx={{
            margin: "20px 0 30px 0",
            height: "45px",
            background: "#4489f8",
            textTransform: "none",
          }}
          onClick={() => handleOpen()}
          variant="contained"
          size="large"
        >
          {"Post Question"}
        </Button>
      </Stack>

      <Stack spacing={3}>
        <QuestionOverview />
        <QuestionOverview />
        <QuestionOverview />
        <QuestionOverview />
      </Stack>
      <PopUpModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Feed;
