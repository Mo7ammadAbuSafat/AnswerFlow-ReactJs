import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./AboutUsPage.module.css";

const AboutUsPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.aboutUsPage}>
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
      <div
        style={{
          height: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
        }}
      >
        About Page
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
