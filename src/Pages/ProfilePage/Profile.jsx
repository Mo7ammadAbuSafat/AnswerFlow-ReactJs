import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import InformationSection from "./InformationSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserQuestions from "./UserQuestions";
import Calender from "./Calender";
import UserStatistics from "./UserStatistics";

const Profile = ({ userId }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://localhost:7127/api/users/${userId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "No user with this id") {
              navigate(`/*`);
            }
          }
        });
    };
    fetchData();
  }, [userId, navigate]);

  if (userData === null) return <Stack flex={4}>loading......</Stack>;
  return (
    <Stack flex={4} paddingTop={4} alignItems={"center"} spacing={3}>
      <InformationSection userData={userData} />
      <UserStatistics userId={userData.id} />
      <Box height={"200px"} width={"100%"}>
        <Calender userId={userData.id} />
      </Box>
      <UserQuestions userData={userData} />
    </Stack>
  );
};

export default Profile;
