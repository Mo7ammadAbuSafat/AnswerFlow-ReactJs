import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const AboutUsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar>
        <Button
          sx={{
            width: "100px",
            height: "40px",
            color: "white",
            borderColor: "white",
            textTransform: "none",
          }}
          variant="outlined"
          size="medium"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </Navbar>
      <Typography
        sx={{
          height: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
        }}
      >
        About Page
      </Typography>
      <Footer />
    </>
  );
};

export default AboutUsPage;
