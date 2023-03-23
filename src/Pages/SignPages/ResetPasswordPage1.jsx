import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../Components/Store/AlertProvider";
import SignContainer from "./SignContainer";

const ResetPasswordPage1 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValidationError, setEmailValidationError] = useState(" ");
  const alertStates = useContext(AlertContext);

  const CheckValidation = () => {
    return emailValidationError === " " && email !== "";
  };

  const emailSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        tlds: { allow: false },
      }),
  });

  const onChange = (e) => {
    const { value } = e.target;
    const validation = emailSchema.extract("email").validate(value);
    if (validation.error) {
      setEmailValidationError(
        validation.error.details[0].message.replace('"value"', "field")
      );
    } else {
      setEmailValidationError(" ");
    }
    setEmail(value);
  };

  const onSubmit = async (e) => {
    if (CheckValidation) {
      setIsLoading(true);
      await axios
        .post(
          `https://localhost:7127/api/users/reset-password-code?email=${email}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          var userId = response.data.id;
          alertStates.handleOpenSuccessAlert();
          navigate(`/resetPasswordPage2/${userId}`);
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "This email is not exist") {
              setEmailValidationError("this email is not exist");
            } else {
              setEmailValidationError(errorMessage);
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
      <TextField
        sx={{ width: "100%", margin: "10px 0 0 0" }}
        label="Email"
        type="email"
        name="email"
        id="outlined"
        onChange={onChange}
        value={email}
        helperText={emailValidationError}
        error={emailValidationError !== " "}
      />
      <Button
        sx={{
          width: "130px",
          height: "42px",
          textTransform: "none",
          background: "#4489f8",
          margin: "10px 0 5px 0",
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
          "Send Code"
        )}
      </Button>
    </SignContainer>
  );
};

export default ResetPasswordPage1;
