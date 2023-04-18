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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignContainer from "./SignContainer";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword2 = (event) => event.preventDefault();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: " ",
    username: " ",
    password: " ",
    confirmPassword: " ",
  });

  const CheckValidation = () => {
    return (
      validationErrors.email === " " &&
      validationErrors.username === " " &&
      validationErrors.password === " " &&
      validationErrors.confirmPassword === " " &&
      inputs.email !== "" &&
      inputs.username !== "" &&
      inputs.password !== "" &&
      inputs.confirmPassword !== ""
    );
  };

  const signUpSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        tlds: { allow: false },
      }),
    username: Joi.string().required(),
    password: Joi.string().min(8).max(20).required(),
    confirmPassword: Joi.string().equal(inputs.password).required(),
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = signUpSchema.extract(name).validate(value);
    if (validation.error) {
      if (name === "confirmPassword") {
        setValidationErrors({
          ...validationErrors,
          [name]: "field must match Password",
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
    if (CheckValidation) {
      setIsLoading(true);
      await axios
        .post(
          "https://localhost:7127/api/users/registration",
          JSON.stringify(inputs),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          var userId = response.data.id;
          navigate(`/verifyEmailPage/${userId}`);
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "this email is already exist") {
              setValidationErrors({
                ...validationErrors,
                email: "this email is already exist",
              });
            } else {
              console.log(errorMessage);
            }
          } else {
            console.log(error);
            alert("Error: ", error.message);
          }
        });
    }
    setIsLoading(false);
  };

  return (
    <SignContainer>
      <TextField
        sx={{ width: "100%", margin: "10px 0 5px 0" }}
        label="Email"
        type="email"
        name="email"
        id="outlined"
        onChange={onChange}
        value={inputs.email}
        helperText={validationErrors.email}
        error={validationErrors.email !== " "}
      />
      <TextField
        sx={{ width: "100%", margin: "5px 0" }}
        label="Username"
        name="username"
        id="outlined"
        onChange={onChange}
        value={inputs.username}
        helperText={validationErrors.username}
        error={validationErrors.username !== " "}
      />

      <FormControl sx={{ width: "100%", margin: "5px 0" }} variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          error={validationErrors.password !== " "}
        >
          Password
        </InputLabel>
        <OutlinedInput
          autoComplete="off"
          error={validationErrors.password !== " "}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          value={inputs.password}
          onChange={onChange}
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
        />
        <FormHelperText error={validationErrors.password !== " "}>
          {validationErrors.password}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ width: "100%", margin: "5px 0" }} variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password1"
          error={validationErrors.confirmPassword !== " "}
        >
          Confirm Password
        </InputLabel>
        <OutlinedInput
          autoComplete="off"
          error={validationErrors.confirmPassword !== " "}
          id="outlined-adornment-password1"
          type={showPassword2 ? "text" : "password"}
          name="confirmPassword"
          label="ConfirmPassword"
          value={inputs.confirmPassword}
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
        <FormHelperText error={validationErrors.confirmPassword !== " "}>
          {validationErrors.confirmPassword}
        </FormHelperText>
      </FormControl>

      <Button
        sx={{
          width: "101px",
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
          "Sign Up"
        )}
      </Button>
      <p style={{ marginBottom: "0" }}>
        You have an account?{" "}
        <span onClick={() => navigate("/signInPage")}>Sign In</span>
      </p>
    </SignContainer>
  );
};

export default SignUpPage;
