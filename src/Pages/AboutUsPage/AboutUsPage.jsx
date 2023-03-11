import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
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
          Back
        </Button>
      </Navbar>
    </div>
  );
};

export default AboutUsPage;
