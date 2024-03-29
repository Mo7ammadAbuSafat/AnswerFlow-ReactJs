import { Stack } from "@mui/material";
import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import BasicSection from "./BasicSection";
import SecuritySection from "./SecuritySection";
import ProfilePhotoSection from "./ProfilePhotoSection";

const MyAccount = () => {
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Stack flex={4} paddingTop={4} alignItems={"center"}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Basic" value="1" />
            <Tab label="security" value="2" />
            <Tab label="profile photo" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ width: "100%", marginTop: "35px" }}>
          <BasicSection />
        </TabPanel>
        <TabPanel value="2" sx={{ width: "100%", marginTop: "35px" }}>
          <SecuritySection />
        </TabPanel>
        <TabPanel value="3" sx={{ width: "100%", marginTop: "35px" }}>
          <ProfilePhotoSection />
        </TabPanel>
      </TabContext>
    </Stack>
  );
};

export default MyAccount;
