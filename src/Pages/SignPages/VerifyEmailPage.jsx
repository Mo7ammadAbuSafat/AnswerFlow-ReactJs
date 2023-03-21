import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertContext from "../../Components/Store/AlertProvider";
import AuthContext from "../../Components/Store/AuthProvider";
import SignContainer from "./SignContainer";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [code, setCode] = useState("");
  const [validationError, setValidationError] = useState(" ");

  const onChange = (e) => {
    var value = e.target.value;
    setCode(value);
    if (value === "") {
      setValidationError("field is not allowed to be empty");
    } else setValidationError(" ");
  };

  const { userId } = useParams();

  const resendCode = async () => {
    setIsLoading2(true);
    await axios
      .post(
        `https://localhost:7127/api/users/${userId}/verification-email-code`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alertStates.handleOpenSuccessAlert();
      })
      .catch((error) => {
        alert("Error: ", error.message);
      });
    setIsLoading2(false);
  };

  const onSubmit = async (e) => {
    if (code !== "") {
      setIsLoading(true);
      await axios
        .post(
          `https://localhost:7127/api/users/${userId}/verifying-email?code=${code}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          authContext.login(response.data.id);
          alertStates.handleOpenSuccessAlert();
          navigate("/feedPage");
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "Invalid code") {
              setValidationError("invalid code");
            } else {
              alert("Error: ", error.message);
            }
          } else {
            alert("Error: ", error.message);
          }
        });
    }
    setIsLoading(false);
  };

  return (
    <SignContainer>
      <h1 style={{ color: "#656464" }}>Verify Your Email</h1>
      <TextField
        sx={{ width: "100%", margin: "10px 0 10px 0" }}
        label="The Code"
        id="outlined"
        onChange={onChange}
        value={code}
        helperText={validationError}
        error={validationError !== " "}
      />
      <Button
        sx={{
          width: "101px",
          height: "42px",
          textTransform: "none",
          background: "#4489f8",
          margin: "10px 0",
        }}
        variant="contained"
        size="large"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress
            color="inherit"
            size={16}
            sx={{ marginRight: "5px" }}
          />
        ) : (
          "Verify"
        )}
      </Button>
      <p>
        You did't receive the code?{" "}
        <span
          style={{
            pointerEvents: isLoading2 ? "none" : "initial",
            color: isLoading2 ? "#757575" : "",
          }}
          onClick={() => resendCode()}
        >
          Resend
        </span>
      </p>
    </SignContainer>
  );
};

export default VerifyEmailPage;
