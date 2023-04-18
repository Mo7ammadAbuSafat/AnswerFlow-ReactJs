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
import { useNavigate } from "react-router-dom";
import AlertContext from "../../Components/Store/AlertProvider";
import AuthContext from "../../Components/Store/AuthProvider";
import SignContainer from "./SignContainer";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: " ",
    password: " ",
  });

  const CheckValidation = () => {
    return (
      validationErrors.email === " " &&
      validationErrors.password === " " &&
      inputs.email !== "" &&
      inputs.password !== ""
    );
  };

  const signInSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        tlds: { allow: false },
      }),
    password: Joi.string().required(),
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = signInSchema.extract(name).validate(value);
    if (validation.error) {
      setValidationErrors({
        ...validationErrors,
        [name]: validation.error.details[0].message.replace('"value"', "field"),
      });
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
          "https://localhost:7127/api/users/login",
          JSON.stringify(inputs),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          authContext.login(response.data);
          alertStates.handleOpenSuccessAlert();
          console.log(response.data);
          navigate("/feedPage");
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "Password is not correct") {
              setValidationErrors({
                ...validationErrors,
                password: "incorrect password",
              });
            } else if (errorMessage === "this email is not exist") {
              setValidationErrors({
                ...validationErrors,
                email: "this email is not exist",
              });
            } else if (errorMessage === "You must Verify your email") {
              axios
                .get(`https://localhost:7127/api/users?email=${inputs.email}`)
                .then((response) => {
                  navigate(`/verifyEmailPage/${response.data.id}`);
                });
            } else console.log(error);
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
        sx={{ width: "100%", margin: "15px 0 5px 0" }}
        label="Email"
        type="email"
        name="email"
        id="outlined"
        onChange={onChange}
        value={inputs.email}
        helperText={validationErrors.email}
        error={validationErrors.email !== " "}
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
          name="password"
          label="Password"
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
          value={inputs.password}
          onChange={onChange}
        />
        <FormHelperText error={validationErrors.password !== " "}>
          {validationErrors.password}
        </FormHelperText>
      </FormControl>
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
          "Sign In"
        )}
      </Button>
      <p>
        Forget Password?{" "}
        <span onClick={() => navigate("/resetPasswordPage1")}>
          Reset Password
        </span>
      </p>
      <p style={{ marginBottom: "0" }}>
        You don't have an account?{" "}
        <span onClick={() => navigate("/signUpPage")}>Sign Up</span>
      </p>
    </SignContainer>
  );
};

export default SignInPage;
