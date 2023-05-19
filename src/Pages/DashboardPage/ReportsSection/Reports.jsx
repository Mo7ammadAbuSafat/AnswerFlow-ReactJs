import { Stack } from "@mui/material";
import React from "react";
import QuestionReports from "./QuestionReports";
import AnswerReports from "./AnswerReports";

const Reports = () => {
  return (
    <>
      <Stack spacing={4}>
        <QuestionReports />
        <AnswerReports />
      </Stack>
    </>
  );
};

export default Reports;
