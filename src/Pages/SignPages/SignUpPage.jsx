import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sign.module.css";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword2 = (event) => event.preventDefault();
  const navigate = useNavigate();

  return (
    <div className={styles.sign}>
      <div className={styles.container}>
        <img
          onClick={() => navigate("/")}
          src="/Assets/AnswerFlowBlueSign.png"
          alt=""
        />
        <h1>Sign Up</h1>
        <TextField
          sx={{ width: "100%", margin: "10px 0 10px 0" }}
          label="Email"
          id="outlined"
        />
        <TextField
          sx={{ width: "100%", margin: "10px 0 10px 0" }}
          label="Username"
          id="outlined"
        />

        <FormControl
          sx={{ width: "100%", margin: "10px 0" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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
            label="Password"
          />
        </FormControl>
        <FormControl
          sx={{ width: "100%", margin: "10px 0" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
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
            label="Confirm Password"
          />
        </FormControl>

        <Button
          sx={{ background: "#4489f8", margin: "15px 0" }}
          variant="contained"
          size="large"
        >
          {"Sign Up"}
        </Button>
        <p>
          You have an account?{" "}
          <span onClick={() => navigate("/signInPage")}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
