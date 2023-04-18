import { Stack } from "@mui/material";
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
} from "@mui/material";
import React, { useContext, useState } from "react";
import AlertContext from "../../Components/Store/AlertProvider";
import Joi from "joi";
import axios from "axios";
import AuthContext from "../../Components/Store/AuthProvider";
import { useNavigate } from "react-router-dom";

const SecuritySection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleMouseDownPassword1 = (event) => event.preventDefault();
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword2 = (event) => event.preventDefault();

  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext.isLoggedIn) {
    navigate("/signInPage");
  }

  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    oldPassword: " ",
    newPassword: " ",
    confirmNewPassword: " ",
  });

  const CheckValidation = () => {
    return (
      validationErrors.oldPassword === " " &&
      validationErrors.newPassword === " " &&
      validationErrors.confirmNewPassword === " " &&
      inputs.oldPassword !== "" &&
      inputs.newPassword !== "" &&
      inputs.confirmNewPassword !== ""
    );
  };

  const ResetPasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
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

  const onSubmit = async (e) => {
    if (CheckValidation()) {
      setIsLoading(true);
      await axios
        .put(
          `https://localhost:7127/api/users/${authContext.user.id}/reset-password-by-old-password`,
          JSON.stringify(inputs),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setInputs({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
          alertStates.handleOpenSuccessAlert();
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "Password is not correct") {
              setValidationErrors({
                ...validationErrors,
                oldPassword: "incorrect password",
              });
            } else {
              alert("Error: ", errorMessage);
            }
          } else {
            alert("Error: ", error.message);
          }
        });
    }
    setIsLoading(false);
  };

  return (
    <Stack alignItems={"center"} spacing={2}>
      <FormControl
        sx={{
          maxWidth: "450px",
          minWidth: "300px",
          width: "100%",
          marginTop: "40px",
        }}
        variant="outlined"
      >
        <InputLabel
          htmlFor="outlined-adornment-password"
          error={validationErrors.oldPassword !== " "}
        >
          Old Password
        </InputLabel>
        <OutlinedInput
          autoComplete="off"
          error={validationErrors.oldPassword !== " "}
          id="outlined-adornment-password"
          name="oldPassword"
          label="oldPassword"
          type={showPassword1 ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword1}
                onMouseDown={handleMouseDownPassword1}
                edge="end"
              >
                {showPassword1 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value={inputs.oldPassword}
          onChange={onChange}
        />
        <FormHelperText error={validationErrors.oldPassword !== " "}>
          {validationErrors.oldPassword}
        </FormHelperText>
      </FormControl>
      <FormControl
        sx={{
          maxWidth: "450px",
          minWidth: "300px",
          width: "100%",
        }}
        variant="outlined"
      >
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
      <FormControl
        sx={{
          maxWidth: "450px",
          minWidth: "300px",
          width: "100%",
        }}
        variant="outlined"
      >
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
          height: "40px",
          background: "#4489f8",
          textTransform: "none",
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
    </Stack>
  );
};

export default SecuritySection;
