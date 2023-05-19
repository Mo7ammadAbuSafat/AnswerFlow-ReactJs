import { Grid, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useEffect } from "react";
import axios from "axios";
import ApprovedAnswersProgress from "./ApprovedAnswersProgress";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import StatBox from "../DashboardPage/StatisticsSection/StatBox";

const UserStatistics = ({ userId }) => {
  const [userStatistics, setUserStatistics] = useState({
    approvedAnswersCount: 0,
    questionsCount: 0,
    lastMonthQuestionsCount: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://localhost:7127/api/statistics/users/${userId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setUserStatistics(response.data);
        });
    };
    fetchData();
  }, [userId]);
  return (
    <Grid container spacing={2} justifyContent={"center"} padding={2}>
      <Grid item xs={12} sm={6}>
        <Stack
          justifyContent={"space-between"}
          height={"152px"}
          p={3}
          direction={"row"}
          sx={{
            borderRadius: "30px",
            boxShadow: "0px 0px 3px 0px silver",
          }}
        >
          <StatBox
            title="Total Questions"
            number={userStatistics.questionsCount}
            increase={
              100 *
              (userStatistics.lastMonthQuestionsCount /
                userStatistics.questionsCount)
            }
            icon={
              <QuestionMarkIcon sx={{ color: "white", fontSize: "30px" }} />
            }
          />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack
          justifyContent={"space-between"}
          height={"152px"}
          p={3}
          direction={"row"}
          sx={{
            borderRadius: "30px",
            boxShadow: "0px 0px 3px 0px silver",
          }}
        >
          <ApprovedAnswersProgress
            title="Approved Answers"
            number={userStatistics.approvedAnswersCount}
            increase={100 * (userStatistics.approvedAnswersCount / 50)}
            icon={
              <MarkChatReadIcon sx={{ color: "white", fontSize: "30px" }} />
            }
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UserStatistics;
