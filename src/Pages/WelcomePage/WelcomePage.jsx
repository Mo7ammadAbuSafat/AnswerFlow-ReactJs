import { Button } from "@mui/material";
import React from "react";
import WelcomePageNavbar from "../../Components/WelcomePageNavbar/WelcomePageNavbar";
import styles from "./WelcomePage.module.css";

const WelcomePage = (props) => {
  return (
    <>
      <WelcomePageNavbar />
      <div className={styles.welcomePage}>
        <div className={styles.textSide}>
          <h1>Find Your Answers In Our Community!</h1>
          <p>
            Computer systems engineering students at Kadoorie University in one
            place, where they exchange experiences with each other
            <br />
            what are you waiting for? Join us now!
          </p>
          <div className={styles.buttons}>
            <Button
              sx={{ background: "#4489f8", marginRight: "50px" }}
              variant="contained"
              size="large"
            >
              {"Get Started"}
            </Button>
            <Button variant="outlined" size="large">
              {"About Us"}
            </Button>
          </div>
        </div>
        <img src="/Assets/WelcomePage.png" alt="" />
      </div>
    </>
  );
};

export default WelcomePage;
