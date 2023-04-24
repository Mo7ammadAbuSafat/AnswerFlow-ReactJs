import { Box, Stack, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Users from "./Users";
import StatBox from "./StatBox";
import GroupIcon from "@mui/icons-material/Group";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ReportIcon from "@mui/icons-material/Report";
import { VictoryPie } from "victory";
import DashboardCard from "./DashboardCard";
import Reports from "./Reports";
import axios from "axios";

const Dashboard = () => {
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
        .get(`https://localhost:7127/api/questions/statistics`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setQuestionsStatistics(response.data);
        });
      await axios
        .get(`https://localhost:7127/api/users/statistics`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setUsersStatistics(response.data);
        });
      await axios
        .get(`https://localhost:7127/api/reports/statistics`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setReportsStatistics(response.data);
        });
    };
    fetchData();
  }, []);

  return (
    <Stack
      flex={5.5}
      sx={{
        padding: {
          xs: "20px 5px 10px 5px",
          sm: "10 0",
          md: "10 0",
          lg: "10 0",
        },
      }}
      alignItems={"center"}
    >
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={6}>
          <DashboardCard>
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
          </DashboardCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashboardCard>
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
          </DashboardCard>
        </Grid>
        <Grid item xs={12} sm={4.5}>
          <DashboardCard>
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
          </DashboardCard>
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
          <DashboardCard>
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
          </DashboardCard>
        </Grid>
        <Grid item xs={12}>
          <Box
            p={1.5}
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
              borderRadius: "30px",
              boxShadow: "0px 0px 20px 0px silver",
            }}
          >
            <Typography
              sx={{
                margin: "10px",
                fontSize: "15px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: "rgb(108, 115, 127)",
              }}
            >
              users
            </Typography>
            <Users />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            p={1.5}
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
              borderRadius: "30px",
              boxShadow: "0px 0px 20px 0px silver",
            }}
          >
            <Typography
              sx={{
                margin: "10px",
                fontSize: "15px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: "rgb(108, 115, 127)",
              }}
            >
              Reports
            </Typography>
            <Reports />
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Dashboard;
