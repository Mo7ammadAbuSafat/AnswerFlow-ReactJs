import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Sign.module.css";

const SignContainer = ({ children }) => {
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
      <div className={styles.sign}>
        <div className={styles.container}>
          <img
            onClick={() => navigate("/")}
            src="/Assets/AnswerFlowBlueSign.png"
            alt=""
          />
          {children}
        </div>
      </div>
    </>
  );
};

export default SignContainer;
