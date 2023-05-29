import React, { useContext, useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ReportIcon from "@mui/icons-material/Report";
import { VictoryPie } from "victory";
import axios from "axios";
import AuthContext from "../../../Components/Store/AuthProvider";
import { Box, Grid } from "@mui/material";
import StatBox from "./StatBox";
import StatisticCard from "./StatisticCard";

const Statistics = () => {
  const authContext = useContext(AuthContext);
  const [questionsStatistics, setQuestionsStatistics] = useState({
    count: 0,
    lastMonthQuestionsCount: 0,
    openQuestionsCount: 0,
    closedQuestionsCount: 0,
  });
  const [usersStatistics, setUsersStatistics] = useState({
    usersCount: 0,
    lastMonthAddedUsersCount: 0,
    expertUsersCount: 0,
    lastMonthAddedExpertsCount: 0,
  });
  const [reportsStatistics, setReportsStatistics] = useState({
    count: 0,
    lastMonthReportsCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://localhost:7127/api/statistics/questions`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        })
        .then((response) => {
          setQuestionsStatistics(response.data);
        });
      await axios
        .get(`https://localhost:7127/api/statistics/users`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        })
        .then((response) => {
          setUsersStatistics(response.data);
        });
      await axios
        .get(`https://localhost:7127/api/statistics/reports`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        })
        .then((response) => {
          setReportsStatistics(response.data);
        });
    };
    fetchData();
  }, [authContext]);

  return (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item xs={12} sm={6}>
        <StatisticCard>
          <StatBox
            title="Total Users"
            number={usersStatistics.usersCount}
            increase={
              100 *
              (usersStatistics.lastMonthAddedUsersCount /
                usersStatistics.usersCount)
            }
            icon={<GroupIcon sx={{ color: "white", fontSize: "30px" }} />}
          />
        </StatisticCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <StatisticCard>
          <StatBox
            title="Total Experts"
            number={usersStatistics.expertUsersCount}
            increase={
              100 *
              (usersStatistics.lastMonthAddedExpertsCount /
                usersStatistics.expertUsersCount)
            }
            icon={<GroupIcon sx={{ color: "white", fontSize: "30px" }} />}
          />
        </StatisticCard>
      </Grid>
      <Grid item xs={12} sm={4.5}>
        <StatisticCard>
          <StatBox
            title="Total Questions"
            number={questionsStatistics.count}
            increase={
              100 *
              (questionsStatistics.lastMonthQuestionsCount /
                questionsStatistics.count)
            }
            icon={
              <QuestionMarkIcon sx={{ color: "white", fontSize: "25px" }} />
            }
          />
        </StatisticCard>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Box
          direction={"row"}
          justifyContent={"space-between"}
          sx={{
            height: "152px",
            borderRadius: "30px",
            boxShadow: "0px 0px 20px 0px silver",
          }}
        >
          <VictoryPie
            colorScale={["#555", "#4489f8"]}
            data={[
              { x: "open", y: questionsStatistics.openQuestionsCount },
              { x: "closed", y: questionsStatistics.closedQuestionsCount },
            ]}
            innerRadius={35}
            labelRadius={50}
            style={{ labels: { fontSize: 30, fill: "white" } }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={4.5}>
        <StatisticCard>
          <StatBox
            title="Total Reports"
            number={reportsStatistics.count}
            increase={
              100 *
              (reportsStatistics.lastMonthReportsCount /
                reportsStatistics.count)
            }
            icon={<ReportIcon sx={{ color: "white", fontSize: "25px" }} />}
          />
        </StatisticCard>
      </Grid>
    </Grid>
  );
};

export default Statistics;
