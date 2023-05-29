import { Box, Stack, Tab } from "@mui/material";
import React, { useState } from "react";
import Reports from "./ReportsSection/Reports";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Statistics from "./StatisticsSection/Statistics";
import Users from "./UsersSection/Users";

const Dashboard = () => {
  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <TabList onChange={handleTabChange}>
            <Tab label="Statistics" value="1" />
            <Tab label="Users" value="2" />
            <Tab label="Reports" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: "20px 0", width: "100%" }}>
          <Statistics />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: "20px 0", width: "100%" }}>
          <Users />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: "20px 0", width: "100%" }}>
          <Reports />
        </TabPanel>
      </TabContext>
    </Stack>
  );
};

export default Dashboard;
