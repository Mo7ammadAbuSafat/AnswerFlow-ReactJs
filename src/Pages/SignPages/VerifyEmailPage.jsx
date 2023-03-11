import { Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SignContainer from "./SignContainer";

const VerifyEmailPage = () => {
  const navigate = useNavigate();

  return (
    <SignContainer>
      <h1>Verify Your Email</h1>
      <TextField
        sx={{ width: "100%", margin: "10px 0 10px 0" }}
        label="The Code"
        id="outlined"
      />
      <Button
        sx={{
          textTransform: "none",
          background: "#4489f8",
          margin: "10px 0",
        }}
        variant="contained"
        size="large"
      >
        {"Verify"}
      </Button>
      <p>
        You did't receive the code?{" "}
        <span /*onClick={() => resendToken()}*/>Resend</span>
      </p>
    </SignContainer>
  );
};

export default VerifyEmailPage;
