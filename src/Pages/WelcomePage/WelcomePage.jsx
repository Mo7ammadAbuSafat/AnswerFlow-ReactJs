import { Button } from "@mui/material";
import React, { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./WelcomePage.module.css";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Components/Store/AuthProvider";

const WelcomePage = (props) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const handleLogoutClick = () => {
    authContext.logout();
    navigate("/sign-in");
  };

  return (
    <>
      <Navbar>
        <div>
          {authContext.isLoggedIn ? (
            <Button
              sx={{
                textTransform: "none",
                height: "40px",
                color: "white",
                borderColor: "white",
                marginLeft: "10px",
              }}
              variant="outlined"
              size="medium"
              onClick={() => handleLogoutClick()}
            >
              Log out
            </Button>
          ) : (
            <>
              <Button
                sx={{
                  textTransform: "none",
                  height: "40px",
                  color: "white",
                  borderColor: "white",
                  backgroundColor: "#ffaf2e",
                }}
                variant="outlined"
                size="medium"
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  height: "40px",
                  color: "white",
                  borderColor: "white",
                  marginLeft: "10px",
                }}
                variant="outlined"
                size="medium"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </Navbar>
      <div className={styles.welcomePage}>
        <div className={styles.textSide}>
          <h1>Find Your Answers In Our Community!</h1>
          <p>
            Computer Systems Engineering Students at Kadoorie University in one
            place, where they exchange experiences with each other.
            <br />
            What are you waiting for! ...... Join us now!{" "}
          </p>
          <div className={styles.buttons}>
            <Button
              sx={{
                width: "140px",
                background: "#4489f8",
                marginRight: "50px",
                textTransform: "none",
              }}
              onClick={() => navigate("/feed")}
              variant="contained"
              size="large"
            >
              {"Get Started"}
            </Button>
            <Button
              sx={{ width: "140px", textTransform: "none" }}
              onClick={() => navigate("/about")}
              variant="outlined"
              size="large"
            >
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
