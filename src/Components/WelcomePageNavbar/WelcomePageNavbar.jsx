import { Button } from "@mui/material";
import React from "react";
import styles from "./WelcomePageNavbar.module.css";

const WelcomePageNavbar = () => {
  return (
    <div className={styles.navbar}>
      <img src="/Assets/AnswerFlow-Logo.png" />
      <Button
        sx={{ color: "white", borderColor: "white" }}
        variant="outlined"
        size="large"
      >
        SignIn
      </Button>
    </div>
  );
};

export default WelcomePageNavbar;
