import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertContext from "../../Components/Store/AlertProvider";
import SignContainer from "./SignContainer";

const ResetPasswordPage2 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword2 = (event) => event.preventDefault();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const alertStates = useContext(AlertContext);

  const [isLoading2, setIsLoading2] = useState(false);

  const [inputs, setInputs] = useState({
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    code: " ",
    newPassword: " ",
    confirmNewPassword: " ",
  });

  const CheckValidation = () => {
    return (
      validationErrors.code === " " &&
      validationErrors.newPassword === " " &&
      validationErrors.confirmNewPassword === " " &&
      inputs.code !== "" &&
      inputs.newPassword !== "" &&
      inputs.confirmNewPassword !== ""
    );
  };

  const ResetPasswordSchema = Joi.object({
    code: Joi.string().required(),
    newPassword: Joi.string().min(8).max(20).required(),
    confirmNewPassword: Joi.string().equal(inputs.newPassword).required(),
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = ResetPasswordSchema.extract(name).validate(value);
    if (validation.error) {
      if (name === "confirmNewPassword") {
        setValidationErrors({
          ...validationErrors,
          [name]: "field must match New Password",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          [name]: validation.error.details[0].message.replace(
            '"value"',
            "field"
          ),
        });
      }
    } else {
      const err = { ...validationErrors };
      err[name] = " ";
      setValidationErrors({ ...err });
    }
    setInputs({ ...inputs, [name]: value });
  };

  const resendCode = async () => {
    setIsLoading2(true);
    await axios
      .post(
        `https://localhost:7127/api/users/${userId}/resend-reset-password-code`,
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
    if (CheckValidation) {
      setIsLoading(true);
      await axios
        .put(
          `https://localhost:7127/api/users/${11}/reset-password`,
          JSON.stringify(inputs),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          alertStates.handleOpenSuccessAlert();
          navigate("/signInPage");
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "Invalid Code") {
              setValidationErrors({
                ...validationErrors,
                code: "invalid code",
              });
            } else if (errorMessage === "Expired Code, we sent another one") {
              setValidationErrors({
                ...validationErrors,
                code: "expired code, we sent another one",
              });
            } else {
              alert("Error: ", errorMessage);
            }
            setInputs();
          } else {
            alert("Error: ", error.message);
          }
        });
      setInputs({ ...inputs, newPassword: "", confirmNewPassword: "" });
    }
    setIsLoading(false);
  };

  return (
    <SignContainer>
      <TextField
        sx={{ width: "100%", margin: "15px 0 0 0" }}
        label="The Code"
        name="code"
        id="outlined"
        onChange={onChange}
        value={inputs.code}
        helperText={validationErrors.code}
        error={validationErrors.code !== " "}
      />
      <FormControl sx={{ width: "100%", margin: "5px 0" }} variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          error={validationErrors.newPassword !== " "}
        >
          New Password
        </InputLabel>
        <OutlinedInput
          autoComplete="off"
          error={validationErrors.newPassword !== " "}
          id="outlined-adornment-password"
          name="newPassword"
          label="newPassword"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value={inputs.newPassword}
          onChange={onChange}
        />
        <FormHelperText error={validationErrors.newPassword !== " "}>
          {validationErrors.newPassword}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ width: "100%", margin: "3px 0" }} variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password1"
          error={validationErrors.confirmNewPassword !== " "}
        >
          Confirm New Password
        </InputLabel>
        <OutlinedInput
          autoComplete="off"
          error={validationErrors.confirmNewPassword !== " "}
          id="outlined-adornment-password1"
          type={showPassword2 ? "text" : "password"}
          name="confirmNewPassword"
          label="Confirm New Password"
          value={inputs.confirmNewPassword}
          onChange={onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword2}
                onMouseDown={handleMouseDownPassword2}
                edge="end"
              >
                {showPassword2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error={validationErrors.confirmNewPassword !== " "}>
          {validationErrors.confirmNewPassword}
        </FormHelperText>
      </FormControl>
      <Button
        sx={{
          width: "160px",
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
          "Reset Password"
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

export default ResetPasswordPage2;
