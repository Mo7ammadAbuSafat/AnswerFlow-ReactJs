import { Button } from "@mui/material";
import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./WelcomePage.module.css";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const WelcomePage = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar>
        <div>
          <Button
            sx={{ height: "40px", color: "white", borderColor: "white" }}
            variant="outlined"
            size="medium"
            onClick={() => navigate("/signUpPage")}
          >
            Sign Up
          </Button>
          <Button
            sx={{
              height: "40px",
              color: "white",
              borderColor: "white",
              marginLeft: "10px",
            }}
            variant="outlined"
            size="medium"
            onClick={() => navigate("/signInPage")}
          >
            Sign In
          </Button>
        </div>
      </Navbar>
      <div className={styles.welcomePage}>
        <div className={styles.textSide}>
          <h1>Find Your Answers In Our Community!</h1>
          <p>
            Computer systems engineering students at Kadoorie University in one
            place, where they exchange experiences with each other.
            <br />
            What are you waiting for! ...... Join us now!
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
      <Footer />
    </>
  );
};

export default WelcomePage;
