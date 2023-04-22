import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import InformationSection from "./InformationSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserQuestions from "./UserQuestions";

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
  if (userData === null) return <Stack flex={4}></Stack>;
  return (
    <Stack flex={4} paddingTop={4} alignItems={"center"} spacing={5}>
      <InformationSection userData={userData} />
      <UserQuestions userData={userData} />
    </Stack>
  );
};

export default Profile;
