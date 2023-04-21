import { Box, Card, Pagination, Stack, Tab } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Question from "../../Components/Question/Question";
import { TabContext, TabList } from "@mui/lab";
import AuthContext from "../../Components/Store/AuthProvider";

const Feed = () => {
  const authContext = useContext(AuthContext);

  const [tabValue, setTabValue] = useState("recently");
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // for pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  // end

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl =
        tabValue === "following"
          ? `https://localhost:7127/api/questions/users/${authContext.user.id}/following`
          : "https://localhost:7127/api/questions";
      await axios
        .get(apiUrl, {
          params: {
            pageNumber: pageNumber,
            pageSize: 10,
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
  }, [pageNumber, tabValue, authContext]);

  if (data === null) {
    return <Box flex={4}>Loading...</Box>;
  }

  return (
    <Box flex={4} p={2}>
      <TabContext value={tabValue}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "228.45px",
            margin: "10px auto 30px auto",
          }}
        >
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Recently" value="recently" />
            <Tab
              label="Following"
              value="following"
              disabled={!authContext.isLoggedIn}
            />
          </TabList>
        </Box>
      </TabContext>

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

export default Feed;
